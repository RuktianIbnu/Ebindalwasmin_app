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


export default function Report() {
  const [showAwal, setShowAwal] = useState(false);
  const [showAkhir, setShowAkhir] = useState(false);
  const [kategori, setKategori] = useState([]);
  const [satker, setSatker] = useState([]);
  const [kategoriChild, setKategoriChild] = useState([]);
  const [kategoriDropdown, setKategoriDropdown] = useState([]);
  const [selectedKategori, setSelectedKategori] = useState('');
  const [satkerDropdown, setSatkerDropdown] = useState([]);
  const [selectedSatker, setSelectedSatker] = useState('');
  const [selectedTanggalAwal, setSelectedTanggalAwal] = useState(new Date(Date.now()));
  const [selectedTanggalAkhir, setSelectedTanggalAkhir] = useState(new Date(Date.now()));
  const accessToken = useSelector((state) => state.accessToken);
  const dispatch = useDispatch();

  useEffect(() => {
    GetKategoriPNBP();
    GetSatker();
  }, []);

  const GetKategoriPNBP = async () => {
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
        const kategori = data.data;
        const kategoriArr = [];
        //console.log(kategori);
        for (const iterator of kategori) {
          kategoriArr.push(iterator);
        }
        setKategoriDropdown(kategoriArr);
        setKategori(data.data);
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
          <Text>Jenis Layanan</Text>
          <PickerContainer>
            <Picker
              selectedValue={selectedKategori}
              onValueChange={(itemValue, _) => setSelectedKategori(itemValue)}>
              <Picker.Item value="all" label="SEMUA JENIS LAYANAN" />
              {kategoriDropdown.map((item) => (
                <Picker.Item
                  key={item.id}
                  label={item.nama_layanan}
                  value={item.id}
                />
              ))}
            </Picker>
          </PickerContainer>
          <Text>Satuan Kerja</Text>
          <PickerContainer>
            <Picker
              selectedValue={selectedSatker}
              onValueChange={(itemValue, _) => setSelectedSatker(itemValue)}>
              <Picker.Item value="all" label="SEMUA SATUAN KERJA" />
              {satkerDropdown.map((item, index) => (
                <Picker.Item
                  key={index}
                  label={item.nama_kantor}
                  value={item.id_kantor}
                />
              ))}
            </Picker>
          </PickerContainer>
          <BottonContainer>
              <ButtonNext>
                <ButtonLabel>Cari</ButtonLabel>
              </ButtonNext>
            </BottonContainer>
        </Container>
      </>
  );
}

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
