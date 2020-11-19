import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import {useSelector, useDispatch} from 'react-redux';
import Axios from 'axios';
import {BASE_URL} from '../helpers/global';
import moment from 'moment';
import {Alert} from 'react-native';
import {setLoading} from '../store/actionCreator';

export default function Administrasi() {
  const [show, setShow] = useState(false);
  const [kategori, setKategori] = useState([]);
  const [kategoriChild, setKategoriChild] = useState([]);
  const [kategoriDropdown, setKategoriDropdown] = useState([]);
  const [satkerDropdown, setSatkerDropdown] = useState([]);
  const [selectedKategori, setSelectedKategori] = useState('');
  const [selectedTanggal, setSelectedTanggal] = useState(new Date(Date.now()));
  const [selectedSatker, setSelectedSatker] = useState('');
  const accessToken = useSelector((state) => state.accessToken);
  const dispatch = useDispatch();
  const state = {
    language: 'java',
  };

  useEffect(() => {
    GetKategoriPNBP();
    GetSatker();
  }, []);

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
      const {data, status} = response;
      if (status === 200) {
        const kategori = data.data;
        const kategoriArr = [];
        for (const iterator of kategori) {
          // console.log(iterator);
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

  const GetKategoriDataByTanggal = async () => {
    // console.log(selectedKategori, selectedTanggal);
    try {
      if (selectedKategori === '' || selectedSatker ==='') {
        Alert.alert(null, 'Pilih Kategori dan Satuan kerja terlebih dahulu');
      } else {
        //console.log('SELECTED KATEGORI', selectedKategori);
        dispatch(setLoading(true));
        const headers = {
          Authorization: accessToken,
        };

        const body = {
          id_satker: selectedSatker,
          tanggal: moment(selectedTanggal).format('YYYY-MM-DD'),
        };

        setKategoriChild([])
        switch (selectedKategori) {
          case 'DOKUMEN PERJALANAN REPUBLIK INDONESIA':
            const responsePaspor = await Axios.post(
              `${BASE_URL}/resources/paspor-by/`, body,
              {headers},
            );
            // const {status, data} = responsePaspor;
            if (responsePaspor.status === 200) {
              const dataByTanggal = responsePaspor.data.data;
              for (const iterator of kategori) {
                // console.log(iterator.child);
                if (
                  iterator.nama_layanan ===
                  'DOKUMEN PERJALANAN REPUBLIK INDONESIA'
                ) {
                  for (const item of iterator.child) {
                    if (dataByTanggal.length !== 0) {
                      for (const iterator of dataByTanggal) {
                        if (item.id === iterator.id_jenis) {
                          item.laki = iterator.laki;
                          item.perempuan = iterator.perempuan;
                          item.total = iterator.total;
                        }
                      }
                    } else {
                      item.laki = 0;
                      item.perempuan = 0;
                      item.total = 0;
                    }
                  }
                  setKategoriChild(iterator.child);
                }
              }
              dispatch(setLoading(false));
            }

            break;

          case 'IZIN KEIMIGRASIAN':
            //console.log(tanggal);
            const responseIntal = await Axios.post(
              `${BASE_URL}/resources/intal-by/`, body,
              {headers},
            );
            // const {status, data} = responseIntal;
            if (responseIntal.status === 200) {
              const dataByTanggal = responseIntal.data.data;
              
              for (const kategoriItem of kategori) {
                if (kategoriItem.nama_layanan === 'IZIN KEIMIGRASIAN') {
                  for (const kategoriItemChild of kategoriItem.child) {
                    //console.log(kategoriItem.child);
                    if (kategoriItemChild.child.length !== 0) {
                      for (const item of kategoriItemChild.child) {
                        if (dataByTanggal.length !== 0) {
                          for (const itemByTanggal of dataByTanggal) {
                            if (itemByTanggal.id_jenis === item.id) {
                              item.laki = itemByTanggal.laki;
                              item.perempuan = itemByTanggal.perempuan;
                              item.total = itemByTanggal.total;
                            }
                          }
                        } else {
                          item.laki = 0;
                          item.perempuan = 0;
                          item.total = 0;
                        }
                      }
                    } else {
                      if (dataByTanggal.length !== 0) {
                        for (const itemByTanggal of dataByTanggal) {
                          if (itemByTanggal.id_jenis === kategoriItemChild.id) {
                            kategoriItemChild.laki = itemByTanggal.laki;
                            kategoriItemChild.perempuan =
                              itemByTanggal.perempuan;
                            kategoriItemChild.total = itemByTanggal.total;
                          }
                        }
                      } else {
                        kategoriItemChild.laki = 0;
                        kategoriItemChild.perempuan = 0;
                        kategoriItemChild.total = 0;
                      }
                    }
                  }
                  setKategoriChild(kategoriItem.child);
                }
              }

              dispatch(setLoading(false));
            }
            break;

          case 'VISA':
            const responseVisa = await Axios.post(
              `${BASE_URL}/resources/visa-by/`, body,
              {headers},
            );
            // const {status, data} = responseVisa;
            if (responseVisa.status === 200) {
              const dataByTanggal = responseVisa.data.data;

              for (const kategoriItem of kategori) {
                if (kategoriItem.nama_layanan === 'VISA') {
                  for (const kategoriItemChild of kategoriItem.child) {
                    if (kategoriItemChild.child.length !== 0) {
                      for (const item of kategoriItemChild.child) {
                        if (dataByTanggal.length !== 0) {
                          for (const itemByTanggal of dataByTanggal) {
                            if (itemByTanggal.id_jenis === item.id) {
                              item.laki = itemByTanggal.laki;
                              item.perempuan = itemByTanggal.perempuan;
                              item.total = itemByTanggal.total;
                            }
                          }
                        } else {
                          item.laki = 0;
                          item.perempuan = 0;
                          item.total = 0;
                        }
                      }
                    } else {
                      if (dataByTanggal.length !== 0) {
                        for (const itemByTanggal of dataByTanggal) {
                          if (itemByTanggal.id_jenis === kategoriItemChild.id) {
                            kategoriItemChild.laki = itemByTanggal.laki;
                            kategoriItemChild.perempuan =
                              itemByTanggal.perempuan;
                            kategoriItemChild.total = itemByTanggal.total;
                          }
                        }
                      } else {
                        kategoriItemChild.laki = 0;
                        kategoriItemChild.perempuan = 0;
                        kategoriItemChild.total = 0;
                      }
                    }
                  }
                  setKategoriChild(kategoriItem.child);
                }
              }

              dispatch(setLoading(false));
            }
            break;

          case 'PNBP KEIMIGRASIAN LAINNYA':
            const responsePNBP = await Axios.post(
              `${BASE_URL}/resources/pnbp-by/`, body,
              {headers},
            );
            if (responsePNBP.status === 200) {
              const dataByTanggal = responsePNBP.data.data;
              //console.log('DATA BY TANGG', dataByTanggal);
              for (const kategoriItem of kategori) {
                if (kategoriItem.nama_layanan === 'PNBP KEIMIGRASIAN LAINNYA') {
                  for (const kategoriItemChild of kategoriItem.child) {
                    if (kategoriItemChild.child.length !== 0) {
                      //console.log('Item ada isi');
                      for (const iterator of kategoriItemChild.child) {
                        if (dataByTanggal.length !== 0) {
                          for (const itemByTanggal of dataByTanggal) {
                            if (itemByTanggal.id_jenis === iterator.id) {
                              iterator.laki = itemByTanggal.laki;
                              iterator.perempuan = itemByTanggal.perempuan;
                              iterator.total = itemByTanggal.total;
                            }
                          }
                        } else {
                          iterator.laki = 0;
                          iterator.perempuan = 0;
                          iterator.total = 0;
                        }
                      }
                    } else {
                      if (dataByTanggal.length !== 0) {
                        for (const itemByTanggal of dataByTanggal) {
                          if (itemByTanggal.id_jenis === kategoriItemChild.id) {
                            kategoriItemChild.laki = itemByTanggal.laki;
                            kategoriItemChild.perempuan =
                              itemByTanggal.perempuan;
                            kategoriItemChild.total = itemByTanggal.total;
                          }
                        }
                      } else {
                        kategoriItemChild.laki = 0;
                        kategoriItemChild.perempuan = 0;
                        kategoriItemChild.total = 0;
                      }
                    }
                  }
                  setKategoriChild(kategoriItem.child);
                }
              }

              dispatch(setLoading(false));
            }
            break;
        }
      }
    } catch (error) {
      //console.log(error);
    }
  };

  return (
    <>
      <Container>
      <Text>Pilih Satuan Kerja</Text>
        <PickerContainer>
          <Picker
            selectedValue={selectedSatker}
            onValueChange={(itemValue, _) => setSelectedSatker(itemValue)}>
            <Picker.Item value="" label="Pilih Satuan Kerja" />
            {satkerDropdown.map((item, index) => (
              <Picker.Item
                key={index}
                label={item.nama_kantor}
                value={item.id_kantor}
              />
            ))}
          </Picker>
        </PickerContainer>
        <Text>Pilih Kategori</Text>
        <PickerContainer>
          <Picker
            selectedValue={selectedKategori}
            onValueChange={(itemValue, _) => setSelectedKategori(itemValue)}>
            <Picker.Item value="" label="Pilih Kategori" />
            {kategoriDropdown.map((item) => (
              <Picker.Item
                key={item.id}
                label={item.nama_layanan}
                value={item.nama_layanan}
              />
            ))}
          </Picker>
        </PickerContainer>
        <Row>
          <InputContainer onPress={() => setShow(!show)}>
            <>
              <Text>Tanggal</Text>
              <DateInput
                editable={false}
                value={moment(selectedTanggal).format('YYYY-MM-DD')}
              />
            </>
          </InputContainer>
          <BottonContainer>
            <ButtonNext onPress={GetKategoriDataByTanggal}>
              <ButtonLabel>Cari</ButtonLabel>
            </ButtonNext>
          </BottonContainer>
          {show && (
            <DateTimePicker
              value={selectedTanggal}
              mode="date"
              display="calendar"
              onChange={(event, selectedDate) => {
                setShow(!show);
                setSelectedTanggal(selectedDate || selectedTanggal);
              }}
              on
            />
          )}
        </Row>
        {kategoriChild.map((item, index) => (
          <Category key={index}>
            <CategoryContainer>
              <CategoryText>
                {index + 1}. {item.nama_layanan}
              </CategoryText>
            </CategoryContainer>
            {item.child.length !== 0 ? (
              item.child.map((itemChild, itemIndex) => (
                <ChildrenContainer key={itemIndex}>
                  <ChildrenText>
                    {'-'} {itemChild.nama_layanan}
                  </ChildrenText>
                  <ChildenRow>
                    <ChildrenInputContainer>
                      <ChildrenInputLabel>Jumlah Pria</ChildrenInputLabel>
                      <ChildrenInput
                        onChangeText={(text) => {
                          let parent = [...item.child];
                          parent[itemIndex] = {
                            ...parent[itemIndex],
                            laki: parseInt(text || 0),
                          };
                          let newArr = [...kategoriChild];
                          newArr[index].child[itemIndex] = parent[itemIndex];
                          setKategoriChild(newArr);
                        }}
                        onBlur={() => {
                          let parent = [...item.child];
                          const laki = parent[itemIndex].laki;
                          const perempuan = parent[itemIndex].perempuan;
                          const tarifPNBP = parent[itemIndex].tarif_pnbp;
                          const sum = laki + perempuan;
                          const total = sum * tarifPNBP;

                          parent[itemIndex] = {
                            ...parent[itemIndex],
                            total,
                          };
                          let newArr = [...kategoriChild];
                          newArr[index].child[itemIndex] = parent[itemIndex];
                          setKategoriChild(newArr);
                        }}
                        value={itemChild.laki.toString()}
                      />
                    </ChildrenInputContainer>
                    <ChildrenInputContainer>
                      <ChildrenInputLabel>Jumlah Wanita</ChildrenInputLabel>
                      <ChildrenInput
                        onChangeText={(text) => {
                          let parent = [...item.child];
                          parent[itemIndex] = {
                            ...parent[itemIndex],
                            perempuan: parseInt(text || 0),
                          };
                          let newArr = [...kategoriChild];
                          newArr[index].child[itemIndex] = parent[itemIndex];
                          setKategoriChild(newArr);
                        }}
                        onBlur={() => {
                          let parent = [...item.child];
                          const laki = parent[itemIndex].laki;
                          const perempuan = parent[itemIndex].perempuan;
                          const tarifPNBP = parent[itemIndex].tarif_pnbp;
                          const sum = laki + perempuan;
                          const total = sum * tarifPNBP;

                          parent[itemIndex] = {
                            ...parent[itemIndex],
                            total,
                          };
                          let newArr = [...kategoriChild];
                          newArr[index].child[itemIndex] = parent[itemIndex];
                          setKategoriChild(newArr);
                        }}
                        value={itemChild.perempuan.toString()}
                      />
                    </ChildrenInputContainer>
                    <ChildrenInputContainer>
                      <ChildrenInputLabel>Total</ChildrenInputLabel>
                      <ChildrenInput
                        editable={false}
                        value={itemChild.total.toString()}
                      />
                    </ChildrenInputContainer>
                  </ChildenRow>
                </ChildrenContainer>
              ))
            ) : (
              <ChildenRow>
                <ChildrenInputContainer>
                  <ChildrenInputLabel>Jumlah Pria</ChildrenInputLabel>
                  <ChildrenInput
                    onChangeText={(text) => {
                      let newArr = [...kategoriChild];

                      newArr[index] = {
                        ...newArr[index],
                        laki: parseInt(text || 0),
                      };
                      setKategoriChild(newArr);
                    }}
                    onBlur={() => {
                      let newArr = [...kategoriChild];

                      let lakiValue = parseInt(newArr[index].laki);
                      let perempuanValue = parseInt(newArr[index].perempuan);
                      let tarifPNBP = parseInt(newArr[index].tarif_pnbp);
                      const totalSum = lakiValue + perempuanValue;
                      const total = totalSum * tarifPNBP;
                      newArr[index] = {
                        ...newArr[index],
                        total,
                      };
                      setKategoriChild(newArr);
                    }}
                    value={item.laki.toString()}
                  />
                </ChildrenInputContainer>
                <ChildrenInputContainer>
                  <ChildrenInputLabel>Jumlah Wanita</ChildrenInputLabel>
                  <ChildrenInput
                    onChangeText={(text) => {
                      let newArr = [...kategoriChild];
                      newArr[index] = {
                        ...newArr[index],
                        perempuan: parseInt(text || 0),
                      };
                      setKategoriChild(newArr);
                    }}
                    onBlur={() => {
                      let newArr = [...kategoriChild];

                      let lakiValue = parseInt(newArr[index].laki);
                      let perempuanValue = parseInt(newArr[index].perempuan);
                      let tarifPNBP = parseInt(newArr[index].tarif_pnbp);
                      const totalSum = lakiValue + perempuanValue;
                      const total = totalSum * tarifPNBP;
                      newArr[index] = {
                        ...newArr[index],
                        total,
                      };
                      setKategoriChild(newArr);
                    }}
                    value={item.perempuan.toString()}
                  />
                </ChildrenInputContainer>
                <ChildrenInputContainer>
                  <ChildrenInputLabel>Total</ChildrenInputLabel>
                  <ChildrenInput
                    editable={false}
                    value={item.total.toString()}
                  />
                </ChildrenInputContainer>
              </ChildenRow>
            )}
          </Category>
        ))}
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
  width: 15%;
  justify-content: center;
  align-items: center;
`;
const ButtonLabel = styled.Text`
  color: white;
`;
const ButtonNext = styled.TouchableOpacity`
  background-color: #7e5a9b;
  border-radius: 5px;
  padding-vertical: 8px;
  width: 100%;
  margin-top: 26px;
  justify-content: center;
  align-items: center;
`;
const InputContainer = styled.TouchableOpacity`
  width: 80%;
  margin-right: 20px;
`;
const Row = styled.View`
  flex-direction: row;
  border-bottom-width: 1px;
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
