import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useSelector, useDispatch } from 'react-redux';
import Axios from 'axios';
import { BASE_URL } from '../helpers/global';
import moment from 'moment';
import { Alert } from 'react-native';
import { setLoading } from '../store/actionCreator';
import CheckBox from '@react-native-community/checkbox';
import { DataTable } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';


export default function Report() {
  const DataUser = useSelector((state) => state.user);
  const [showAwal, setShowAwal] = useState(false);
  const [showAkhir, setShowAkhir] = useState(false);
  const [layanan, setLayanan] = useState([]);
  const [satker, setSatker] = useState([]);
  const [dataTable, setDataTable] = useState([]);
  const [layananDropdown, setLayananDropdown] = useState([]);
  const [selectedLayanan, setSelectedLayanan] = useState('');
  const [satkerDropdown, setSatkerDropdown] = useState([]);
  const [selectedSatker, setSelectedSatker] = useState(DataUser.id_kantor);
  const [selectedTanggalAwal, setSelectedTanggalAwal] = useState(new Date(Date.now()));
  const [selectedTanggalAkhir, setSelectedTanggalAkhir] = useState(new Date(Date.now()));
  const accessToken = useSelector((state) => state.accessToken);
  const [toggleCheckBox, setToggleCheckBox] = useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
    GetLayanan();
    GetSatker();
  }, []);

  const GetLayanan = async () => {
    try {
      const headers = {
        Authorization: accessToken,
      };
      dispatch(setLoading(true));
      const response = await Axios.get(`${BASE_URL}/resources/pnbp-kategori`, {
        headers,
      });
      dispatch(setLoading(false));
      const { data, status } = response;
      if (status === 200) {
        const layanan = data.data;
        const layananArr = [];
        //console.log(layanan);
        for (const iterator of layanan) {
          layananArr.push(iterator);
        }
        setLayananDropdown(layananArr);
        setLayanan(data.data);
      }
    } catch (error) {
      //console.log(error);
      dispatch(setLoading(false));
    }
  };

  const GetSatker = async () => {
    try {
      const headers = {
        Authorization: accessToken,
      };
      dispatch(setLoading(true));
      const response = await Axios.get(`${BASE_URL}/resources/satker`, {
        headers,
      });
      dispatch(setLoading(false));
      const { data, status } = response;
      if (status === 200) {
        const satker = data.data;
        const satkerArr = [];
        //console.log(satker);
        for (const iterator of satker) {
          satkerArr.push(iterator);
        }
        setSatkerDropdown(satkerArr);
        setSatker(data.data);
      }
    } catch (error) {
      //console.log(error);
      dispatch(setLoading(false));
    }
  };

  const GetFilter = async () => {
    try {
      const body = {
        cekbox: toggleCheckBox,
        id_jenis: selectedLayanan,
        id_satker: selectedSatker,
        tanggal_akhir: moment(selectedTanggalAkhir).format('YYYY-MM-DD'),
        tanggal_awal: moment(selectedTanggalAwal).format('YYYY-MM-DD'),
      };

      const headers = {
        Authorization: null,
      };

      setDataTable([])
      //console.log(body)
      dispatch(setLoading(true));
      const response = await Axios.post(`${BASE_URL}/resources/filter-monthyear/`, body, {
        headers,
      });

      const { status, data } = response;

      if (status === 200) {
        setDataTable(data.data);
        dispatch(setLoading(false));
        
        if (data.data == '') {
          Alert.alert("Data Tidak Ditemukan")
        }
      }
      else {
        Alert.alert(error);
      }
    }
    catch (errr) {
      Alert.alert(errr)
    }
  }

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  return (
    <>
      <Container>
        <Row>
          <InputContainer onPress={() => setShowAwal(!showAwal)}>
            <>
              <Text>Tanggal</Text>
              <DateInput
                editable={false}
                value={moment(selectedTanggalAwal).format('YYYY-MM-DD')}
              />
            </>
          </InputContainer>
          {showAwal && (
            <DateTimePicker
              value={selectedTanggalAwal}
              mode="date"
              display="calendar"
              onChange={(event, selectedDate) => {
                setShowAwal(!showAwal);
                setSelectedTanggalAwal(selectedDate || selectedTanggalAwal);
              }}
              on
            />
          )}
          <InputContainer onPress={() => setShowAkhir(!showAkhir)}>
            <>
              <Text></Text>
              <DateInput
                editable={false}
                value={moment(selectedTanggalAkhir).format('YYYY-MM-DD')}
              />
            </>
          </InputContainer>
          {showAkhir && (
            <DateTimePicker
              value={selectedTanggalAkhir}
              mode="date"
              display="calendar"
              onChange={(event, selectedDate) => {
                setShowAkhir(!showAkhir);
                setSelectedTanggalAkhir(selectedDate || selectedTanggalAkhir);
              }}
              on
            />
          )}
        </Row>
        <Row>
          <CheckBox
            disabled={false}
            value={toggleCheckBox}
            onValueChange={(newValue) => {
              setDataTable([])
              setToggleCheckBox(newValue)
            }}
          />
          <Text style={{ marginTop: 5 }}>Perbulan Pertahun</Text>
        </Row>
        <Text>Jenis Layanan</Text>
        <PickerContainer>
          <Picker
            selectedValue={selectedLayanan}
            onValueChange={(itemValue, _) => setSelectedLayanan(itemValue)}>
            <Picker.Item value={0} label="SEMUA JENIS LAYANAN" />
            <Picker.Item value={8} label="LAYANAN PERCEPATAN PASPOR" />
            <Picker.Item value={36} label="BIAYA BEBAN PASPOR HILANG" />
            <Picker.Item value={37} label="BIAYA BEBAN PASPOR RUSAK" />
            {layananDropdown.map((item) => (
              <Picker.Item
                key={item.id}
                label={item.nama_layanan}
                value={item.id}
              />
            ))}
          </Picker>
        </PickerContainer>
        <Text>Satuan Kerja</Text>
        {DataUser.id_kantor == 99 ? (
          <PickerContainer>
          <Picker
            selectedValue={selectedSatker}
            onValueChange={(itemValue, _) => setSelectedSatker(itemValue)}>
            <Picker.Item value={99} label="SEMUA SATUAN KERJA" />
            {satkerDropdown.map((item, index) => (
              <Picker.Item
                key={index}
                label={item.nama_kantor}
                value={item.id_kantor}
              />
            ))}
          </Picker>
        </PickerContainer>
        ) : (
        <Text>{DataUser.nama_kantor}</Text>
        )}
        <BottonContainer>
          <ButtonNext onPress={GetFilter}>
            <ButtonLabel>Cari</ButtonLabel>
          </ButtonNext>
        </BottonContainer>
        
        {dataTable.length > 0 ? (
          <DataTable style={{ marginTop: 10, flex: 1 }}>
            {toggleCheckBox ? (
              <DataTable.Header>
                <DataTable.Title style={{ maxWidth: 40 }}>No</DataTable.Title>
                <DataTable.Title>Periode</DataTable.Title>
                <DataTable.Title>Total</DataTable.Title>
              </DataTable.Header>
            ) : (
                <DataTable.Header>
                  <DataTable.Title style={{ maxWidth: 40 }}>No</DataTable.Title>
                  <DataTable.Title>Tanggal</DataTable.Title>
                  <DataTable.Title>Jenis PNBP</DataTable.Title>
                  <DataTable.Title numeric>Total</DataTable.Title>
                </DataTable.Header>
              )}
            {toggleCheckBox ? (
              <ScrollView>
              <>
                {dataTable.map((item, index) => (
                  <DataTable.Row key={index}>
                    <DataTable.Cell style={{ maxWidth: 40 }}>{index + 1}</DataTable.Cell>
                    <DataTable.Cell>{item.periode}</DataTable.Cell>
                    <DataTable.Cell>{'Rp '+ numberWithCommas(item.total)}</DataTable.Cell>
                  </DataTable.Row>
                ))}
              </>
              </ScrollView>
            ) : (
              <ScrollView>
                <>
                  {dataTable.map((item, index) => (
                    <DataTable.Row key={index}>
                      <DataTable.Cell style={{ maxWidth: 40 }}>{index + 1}</DataTable.Cell>
                      <DataTable.Cell>{moment(item.tanggal).format("YYYY-MM-DD")}</DataTable.Cell>
                      <Scroltable horizontal>
                        <DataTable.Cell style={{ flex: 3 }}>{item.jenis_pnbp}</DataTable.Cell>
                      </Scroltable>
                      <DataTable.Cell numeric>{'RP '+ numberWithCommas(item.total)}</DataTable.Cell>
                    </DataTable.Row>
                  ))}
                </>
                </ScrollView>
              )}
          </DataTable>
        ) : (
          <DataTable style={{ marginTop: 10, flex: 1 }}>
            {toggleCheckBox ? (
              <DataTable.Header>
                <DataTable.Title style={{ maxWidth: 40 }}>No</DataTable.Title>
                <DataTable.Title>Periode</DataTable.Title>
                <DataTable.Title>Total</DataTable.Title>
              </DataTable.Header>
            ) : (
                <DataTable.Header>
                  <DataTable.Title style={{ maxWidth: 40 }}>No</DataTable.Title>
                  <DataTable.Title>Tanggal</DataTable.Title>
                  <DataTable.Title>Jenis PNBP</DataTable.Title>
                  <DataTable.Title numeric>Total</DataTable.Title>
                </DataTable.Header>
              )}
          </DataTable>
          )}
      </Container>
    </>
  );
}
const TableCell = styled.Text``
const TableCellContainer = styled.View`
flex-direction: row;
justify-content: space-around;
`
const TableHeader = styled.Text``
const TableHeaderContainer = styled.View`
flex-direction: row;
justify-content: space-around;
`
const Table = styled.View`
margin-top:20px;
`
const Scroltable = styled.ScrollView`
  flex: 1;
`;

const ChildrenInputContainer = styled.View`
  width: 30%;
`;
const ChildrenInputLabel = styled.Text`
  font-size: 12px;
  margin-bottom: 4px;
`;
const ChildenRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
`;
const ChildrenInput = styled.TextInput`
  border-width: 1px;
  border-color: #a1a1a1;
  border-radius: 5px;
  width: 100%;
  padding-horizontal: 8px;
`;
const ChildrenText = styled.Text`
  font-size: 14px;
`;
const ChildrenContainer = styled.View`
  margin-top: 8px;
`;
const Category = styled.View`
  margin-vertical: 16px;
`;

const CategoryText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`;
const CategoryContainer = styled.View`
  background-color: #0077b6;
  padding-vertical: 8px;
  padding-horizontal: 16px;
  border-radius: 5px;
`;

const PickerContainer = styled.View`
  border-color: #a1a1a1;
  border-width: 1px;
  width: 100%;
  border-radius: 5px;
  margin-bottom: 16px;
`;
const BottonContainer = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
`;
const ButtonLabel = styled.Text`
  color: white;
`;
const ButtonNext = styled.TouchableOpacity`
  background-color: #7e5a9b;
  border-radius: 10px;
  padding-vertical: 5px;
  width: 100%;
  margin-top: 15px;
  justify-content: center;
  align-items: center;
`;
const InputContainer = styled.TouchableOpacity`
  width: 40%;
  margin-right: 20px;
`;
const Row = styled.View`
  flex-direction: row;
  padding-bottom: 20px;
  border-bottom-color: #a1a1a1;
`;
const DateInput = styled.TextInput`
  border-width: 1px;
  border-radius: 5px;
  border-color: #a1a1a1;
  width: 100%;
  padding-horizontal: 8px;
  color: #000;
`;
const Text = styled.Text`
  font-weight: bold;
  margin-bottom: 8px;
`;
const Container = styled.ScrollView`
  flex: 1;
  padding-horizontal: 16px;
  padding-vertical: 16px;
  margin-bottom: 16px;
`;
