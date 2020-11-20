import styled from 'styled-components/native';
import {View, Dimensions, StatusBar, Text, ToastAndroid} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import {Provider, useSelector, useDispatch} from 'react-redux';
import Axios from 'axios';
import {BASE_URL} from '../helpers/global';
import React, {useRef, useState, useEffect} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import {Alert} from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import {ScrollView} from 'react-native-gesture-handler';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import {setLoading, setToast} from '../store/actionCreator';

const initialLayout = {width: Dimensions.get('window').width};

export default function Home({navigation}) {
  const [index, setIndex] = useState(0);

  const [routes] = useState([
    {key: 'first', title: 'Paspor'},
    {key: 'second', title: 'Visa'},
    {key: 'thrid', title: 'Izin Tinggal'},
    {key: 'fourth', title: 'PNBP Lainnya'},
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    thrid: ThridRoute,
    fourth: FourthRoute,
  });

  return (
    <>
      <StatusBar backgroundColor="#2196f3" barStyle="light-content" />
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
      />
      <FlashMessage position="bottom" />
    </>
  );
}

const FirstRoute = () => {
  const accessToken = useSelector((state) => state.accessToken);
  const [dataPnbpPaspor, setDataPnbpPaspor] = useState([]);
  const [pemohonPaspor, setPemohonPaspor] = useState([]);
  const [satkerDropdown, setSatkerDropdown] = useState([]);
  const [selectedSatker, setSelectedSatker] = useState(0);
  const [dataPerwilayah, setDataPerwilayah] = useState([]);
  const dispatch = useDispatch();

  const chartConfig = {
    backgroundColor: '#e26a00',
    backgroundGradientFrom: '#fb8c00',
    backgroundGradientTo: '#ffa726',
    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 30,
    },
    propsForDots: {
      r: '3',
      strokeWidth: 5,
      stroke: '#fff',
    },
  };

  useEffect(() => {
    getPemohonPaspor();
    getdataPnbpPaspor();
    GetSatker();
  }, [selectedSatker]);

  const GetSatker = async () => {
    try {
      const headers = {
        Authorization: accessToken,
      };

      const response = await Axios.get(`${BASE_URL}/resources/satker`, {
        headers,
      });

      const {data, status} = response;
      if (status === 200) {
        const satker = data.data;
        const satkerArr = [];
        for (const iterator of satker) {
          satkerArr.push(iterator);
        }
        setSatkerDropdown(satkerArr);
        setSatker(data.data);
      }
    } catch (error) {}
  };

  const getdataPnbpPaspor = async () => {
    try {
      const body = {
        id_layanan: 1,
        id_kantor: selectedSatker,
      };

      const headers = {
        Authorization: null,
      };

      const response = await Axios.post(
        `${BASE_URL}/resources/get-pnbp/`,
        body,
        {
          headers,
        },
      );

      const {status, data} = response;
      if (status === 200) {
        setDataPnbpPaspor(data.data);
      } else {
        //        dispatch(setLoading(false));
      }
    } catch (error) {}
  };

  const getPemohonPaspor = async () => {
    try {
      const headers = {
        Authorization: null,
      };

      const response = await Axios.get(
        `${BASE_URL}/resources/paspor-byKelaminPer10hari/${selectedSatker}`,
        {
          headers,
        },
      );

      const {status, data} = response;
      if (status === 200) {
        setPemohonPaspor(data.data);
      } else {
        // dispatch(setLoading(false));
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  return (
    <>
      <Container>
        <Text>PNBP Paspor</Text>
        <PickerContainer>
          <Picker
            selectedValue={selectedSatker}
            onValueChange={(itemValue, itemPosition) =>
              setSelectedSatker(itemValue)
            }>
            <Picker.Item value={0} label="SEMUA SATUAN KERJA" />
            {satkerDropdown.map((item, index) => (
              <Picker.Item
                key={index}
                label={item.nama_kantor}
                value={item.id_kantor}
              />
            ))}
          </Picker>
        </PickerContainer>
        {dataPnbpPaspor.length > 0 && (
          <LineChart
            data={{
              labels: dataPnbpPaspor.map((v) => v.periode),
              datasets: [
                {
                  data: dataPnbpPaspor.map((v) => parseInt(v.total)),
                },
              ],
            }}
            width={Dimensions.get('screen').width - 20} // from react-native
            height={500}
            yAxisInterval={1} // optional, defaults to 1
            yLabelsOffset={-4}
            xLabelsOffset={8}
            horizontalLabelRotation={-10}
            verticalLabelRotation={-10}
            onDataPointClick={({value, index}) => {
              const message = `${
                dataPnbpPaspor[index].periode
              } - ${numberWithCommas(value)}`;
              console.log(message);
              dispatch(
                setToast({
                  success: true,
                  message,
                  closeToast: () => dispatch(setToast(null)),
                }),
              );
            }}
            chartConfig={chartConfig}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 10,
              width: '100%',
            }}
          />
        )}
        <Line />
        <Text>Permohonan Paspor 10 Hari Terkahir</Text>
        {pemohonPaspor.length > 0 && (
          <PieChart
            data={[
              {
                name: 'LAKI - LAKI',
                population: pemohonPaspor[0].laki,
                color: '#fb8500',
                legendFontColor: '#FFF',
                legendFontSize: 13,
              },
              {
                name: 'PEREMPUAN',
                population: pemohonPaspor[0].perempuan,
                color: '#ef476f',
                legendFontColor: '#FFF',
                legendFontSize: 13,
              },
            ]}
            width={Dimensions.get('screen').width - 20} // from react-native
            height={220}
            chartConfig={{
              color: (opacity = 1) => `white`,
              labelColor: (opacity = 1) => `white`,
              style: {
                borderRadius: 16,
              },
            }}
            backgroundColor="#48cae4"
            accessor="population"
            paddingLeft="15"
            absolute
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        )}
        {/* DATA PERWILAYAH */}
      </Container>
    </>
  );
};

const SecondRoute = () => {
  return (
    <>
      <Container>
        <Text>Visa</Text>
      </Container>
    </>
  );
};

const ThridRoute = () => {
  const accessToken = useSelector((state) => state.accessToken);
  const [dataPnbpIntal, setDataPnbpIntal] = useState([]);
  const [satkerDropdown, setSatkerDropdown] = useState([]);
  const [selectedSatker, setSelectedSatker] = useState(0);
  const [pemohonIntal, setPemohonIntal] = useState([]);
  const [dataPerwilayah, setDataPerwilayah] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getdataPnbpIntal();
    GetSatker();
    getPemohonIntal();
  }, [selectedSatker]);

  const getPemohonIntal = async () => {
    try {
      const headers = {
        Authorization: null,
      };

      const response = await Axios.get(
        `${BASE_URL}/resources/intal-byKelaminPer10hari/${selectedSatker}`,
        {
          headers,
        },
      );

      const {status, data} = response;
      if (status === 200) {
        setPemohonIntal(data.data);
      } else {
        // dispatch(setLoading(false));
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const chartConfig = {
    backgroundColor: '#e26a00',
    backgroundGradientFrom: '#fb8c00',
    backgroundGradientTo: '#ffa726',
    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 30,
    },
    propsForDots: {
      r: '3',
      strokeWidth: 5,
      stroke: '#fff',
    },
  };

  const GetSatker = async () => {
    try {
      const headers = {
        Authorization: accessToken,
      };

      const response = await Axios.get(`${BASE_URL}/resources/satker`, {
        headers,
      });

      const {data, status} = response;
      if (status === 200) {
        const satker = data.data;
        const satkerArr = [];
        for (const iterator of satker) {
          satkerArr.push(iterator);
        }
        setSatkerDropdown(satkerArr);
        setSatker(data.data);
      }
    } catch (error) {}
  };

  const getdataPnbpIntal = async () => {
    try {
      const body = {
        id_layanan: 3,
        id_kantor: selectedSatker,
      };

      const headers = {
        Authorization: null,
      };

      const response = await Axios.post(
        `${BASE_URL}/resources/get-pnbp/`,
        body,
        {
          headers,
        },
      );

      const {status, data} = response;

      if (status === 200) {
        setDataPnbpIntal(data.data);
      } else {
        //Alert.alert(error);
      }
    } catch (error) {
      //console.log(error.response);
      //Alert.alert(error)
    }
  };

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  return (
    <>
      <Container>
      <Text>PNBP Izin Tinggal</Text>
        <PickerContainer>
          <Picker
            selectedValue={selectedSatker}
            onValueChange={(itemValue, itemPosition) =>
              setSelectedSatker(itemValue)
            }>
            <Picker.Item value={0} label="SEMUA SATUAN KERJA" />
            {satkerDropdown.map((item, index) => (
              <Picker.Item
                key={index}
                label={item.nama_kantor}
                value={item.id_kantor}
              />
            ))}
          </Picker>
        </PickerContainer>
        <Text>Izin Tinggal</Text>
        {dataPnbpIntal.length > 0 && (
          <Scroltable horizontal>
            <LineChart
              onDataPointClick={({value, getColor}) =>
                showMessage({
                  message: `${value}`,
                  description: 'You selected this value',
                  backgroundColor: getColor(0.9),
                })
              }
              data={{
                labels: dataPnbpIntal.map((v) => v.periode),
                datasets: [
                  {
                    data: dataPnbpIntal.map((v) => parseInt(v.total)),
                  },
                ],
              }}
              width={Dimensions.get('screen').width - 20} // from react-native
              height={250}
              yAxisInterval={1} // optional, defaults to 1
              yLabelsOffset={-4}
              xLabelsOffset={8}
              horizontalLabelRotation={-10}
              verticalLabelRotation={-10}
              onDataPointClick={({value, index}) => {
                const message = `${
                  dataPnbpIntal[index].periode
                } - ${numberWithCommas(value)}`;
                console.log(message);
                dispatch(
                  setToast({
                    success: true,
                    message,
                    closeToast: () => dispatch(setToast(null)),
                  }),
                );
              }}
              chartConfig={chartConfig}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 10,
                width: '100%',
              }}
            />
          </Scroltable>
        )}
        <Line />
        <Text>Permohonan Izin Tinggal 10 Hari Terkahir</Text>
        {pemohonIntal.length > 0 && (
          <PieChart
            data={[
              {
                name: 'LAKI - LAKI',
                population: pemohonIntal[0].laki,
                color: '#fb8500',
                legendFontColor: '#FFF',
                legendFontSize: 13,
              },
              {
                name: 'PEREMPUAN',
                population: pemohonIntal[0].perempuan,
                color: '#ef476f',
                legendFontColor: '#FFF',
                legendFontSize: 13,
              },
            ]}
            width={Dimensions.get('screen').width - 20} // from react-native
            height={220}
            chartConfig={{
              color: (opacity = 1) => `white`,
              labelColor: (opacity = 1) => `white`,
              style: {
                borderRadius: 16,
              },
            }}
            backgroundColor="#48cae4"
            accessor="population"
            paddingLeft="15"
            absolute
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        )}
      </Container>
    </>
  );
};

const FourthRoute = () => {
  const accessToken = useSelector((state) => state.accessToken);
  const [dataPnbpPnbp, setDataPnbpPnbp] = useState([]);
  const [satkerDropdown, setSatkerDropdown] = useState([]);
  const [selectedSatker, setSelectedSatker] = useState(0);
  const [pemohonPNBP, setPemohonPNBP] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getdataPnbpPnbp();
    GetSatker();
    getPemohonPNBP();
  }, [selectedSatker]);

  const chartConfig = {
    backgroundColor: '#e26a00',
    backgroundGradientFrom: '#fb8c00',
    backgroundGradientTo: '#ffa726',
    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 30,
    },
    propsForDots: {
      r: '3',
      strokeWidth: 5,
      stroke: '#fff',
    },
  };

  const getPemohonPNBP = async () => {
    try {
      const headers = {
        Authorization: null,
      };

      const response = await Axios.get(
        `${BASE_URL}/resources/intal-byKelaminPer10hari/${selectedSatker}`,
        {
          headers,
        },
      );

      const {status, data} = response;
      if (status === 200) {
        setPemohonPNBP(data.data);
      } else {
        // dispatch(setLoading(false));
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const GetSatker = async () => {
    try {
      const headers = {
        Authorization: accessToken,
      };

      const response = await Axios.get(`${BASE_URL}/resources/satker`, {
        headers,
      });

      const {data, status} = response;
      if (status === 200) {
        const satker = data.data;
        const satkerArr = [];
        for (const iterator of satker) {
          satkerArr.push(iterator);
        }
        setSatkerDropdown(satkerArr);
        setSatker(data.data);
      }
    } catch (error) {}
  };

  const getdataPnbpPnbp = async () => {
    try {
      const body = {
        id_layanan: 4,
        id_kantor: selectedSatker,
      };

      const headers = {
        Authorization: null,
      };

      const response = await Axios.post(
        `${BASE_URL}/resources/get-pnbp/`,
        body,
        {
          headers,
        },
      );

      const {status, data} = response;
      if (status === 200) {
        setDataPnbpPnbp(data.data);
      } else {
        //Alert.alert(error);
      }
    } catch (error) {
      //console.log(error.response);
      //Alert.alert(error)
    }
  };
  
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  return (
    <>
      <Container>
      <Text>PNBP Lainnya</Text>
        <PickerContainer>
          <Picker
            selectedValue={selectedSatker}
            onValueChange={(itemValue, itemPosition) =>
              setSelectedSatker(itemValue)
            }>
            <Picker.Item value={0} label="SEMUA SATUAN KERJA" />
            {satkerDropdown.map((item, index) => (
              <Picker.Item
                key={index}
                label={item.nama_kantor}
                value={item.id_kantor}
              />
            ))}
          </Picker>
        </PickerContainer>
        <Text>PNBP Lainnya</Text>
        {dataPnbpPnbp.length > 0 && (
          <Scroltable horizontal>
            <LineChart
              onDataPointClick={({value, getColor}) =>
                showMessage({
                  message: `${value}`,
                  description: 'You selected this value',
                  backgroundColor: getColor(0.9),
                })
              }
              data={{
                labels: dataPnbpPnbp.map((v) => v.periode),
                datasets: [
                  {
                    data: dataPnbpPnbp.map((v) => parseInt(v.total)),
                  },
                ],
              }}
              width={Dimensions.get('screen').width - 20} // from react-native
              height={250}
              yAxisInterval={1} // optional, defaults to 1
              yLabelsOffset={-4}
              xLabelsOffset={8}
              horizontalLabelRotation={-10}
              verticalLabelRotation={-10}
              onDataPointClick={({value, index}) => {
                const message = `${
                  dataPnbpPnbp[index].periode
                } - ${numberWithCommas(value)}`;
                console.log(message);
                dispatch(
                  setToast({
                    success: true,
                    message,
                    closeToast: () => dispatch(setToast(null)),
                  }),
                );
              }}
              chartConfig={chartConfig}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 10,
                width: '100%',
              }}
            />
          </Scroltable>
        )}
        <Line />
        <Text>Permohonan PNBP Lainnya 10 Hari Terkahir</Text>
        {pemohonPNBP.length > 0 && (
          <PieChart
            data={[
              {
                name: 'LAKI - LAKI',
                population: pemohonPNBP[0].laki,
                color: '#fb8500',
                legendFontColor: '#FFF',
                legendFontSize: 13,
              },
              {
                name: 'PEREMPUAN',
                population: pemohonPNBP[0].perempuan,
                color: '#ef476f',
                legendFontColor: '#FFF',
                legendFontSize: 13,
              },
            ]}
            width={Dimensions.get('screen').width - 20} // from react-native
            height={220}
            chartConfig={{
              color: (opacity = 1) => `white`,
              labelColor: (opacity = 1) => `white`,
              style: {
                borderRadius: 16,
              },
            }}
            backgroundColor="#48cae4"
            accessor="population"
            paddingLeft="15"
            absolute
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        )}
      </Container>
    </>
  );
};

const Line = styled.View`
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: #dadada;
  margin-vertical: 5px;
`;
const Scroltable = styled.ScrollView`
  flex: 1;
`;

const screenWidth = styled.View`
  width: 100%;
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
  font-size: 16px;
`;
const ChildrenContainer = styled.View`
  padding-horizontal: 26px;
  margin-top: 8px;
`;
const Category = styled.View`
  margin-vertical: 16px;
`;

const CategoryText = styled.Text`
  color: #fff;
  font-size: 18px;
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
`;
// const Text = styled.Text`
//   font-weight: bold;
//   margin-bottom: 8px;
// `;
const Container = styled.ScrollView`
  flex: 1;
  margin-bottom: 16px;
  padding-horizontal: 10px;
`;

const TitleApp = styled.Text`
  font-weight: bold;
  font-size: 26px;
  color: gray;
  text-align: center;
  margin-top: 72px;
`;

const TextInfo = styled.Text`
  text-align: center;
`;
