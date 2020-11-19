import styled from 'styled-components/native';
import { View, Dimensions, StatusBar, Text } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Provider, useSelector } from 'react-redux';
import Axios from 'axios';
import { BASE_URL } from '../helpers/global';
import React, { useRef, useState, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { Alert } from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit"
import { ScrollView } from 'react-native-gesture-handler';
import FlashMessage, { showMessage } from "react-native-flash-message";

const initialLayout = { width: Dimensions.get('window').width };

export default function Home({ navigation }) {
  const [index, setIndex] = useState(0);

  const [routes] = useState([
    { key: 'first', title: 'Paspor' },
    { key: 'second', title: 'Visa' },
    { key: 'thrid', title: 'Izin Tinggal' },
    { key: 'fourth', title: 'PNBP Lainnya' },
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    thrid: ThridRoute,
    fourth: FourthRoute,
  });

  return (
    <>
      <Container>
        <StatusBar backgroundColor="#2196f3" barStyle="light-content" />
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
        />
      </Container>
    </>
  );
}

const FirstRoute = () => {
  const accessToken = useSelector((state) => state.accessToken);
  const [dataPnbpPaspor, setDataPnbpPaspor] = useState([]);

  useEffect(() => {
    getdataPnbpPaspor()
  }, [])

  const getdataPnbpPaspor = async () => {
    try {
      const body = {
        id_layanan: 1,
        id_kantor: 0,
      };

      const headers = {
        Authorization: null,
      };

      const response = await Axios.post(`${BASE_URL}/resources/get-pnbp/`, body, {
        headers,
      });

      const { status, data } = response;
      console.log(status)
      if (status === 200) {
        setDataPnbpPaspor(data.data);
      }
      else {
        //Alert.alert(error);
      }
    } catch (error) {
      //console.log(error.response);
      //Alert.alert(error)
    }
  };

  return (
    <>
      <Container>
        <Text>Paspor</Text>
        {dataPnbpPaspor.length > 0 && (
          <Scroltable horizontal>
            <LineChart
              onDataPointClick={({ value, getColor }) =>
                showMessage({
                  message: `${value}`,
                  description: "You selected this value",
                  backgroundColor: getColor(0.9)
                })
              }
              data={{
                labels: dataPnbpPaspor.map((v) => v.periode),
                datasets: [
                  {
                    data: dataPnbpPaspor.map((v) => parseInt(v.total))
                  }
                ]
              }}
              width={Dimensions.get("window").width} // from react-native
              height={300}
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#fb8c00",
                backgroundGradientTo: "#ffa726",
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 30,
                  paddingLeft: 50
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: 4,
                  stroke: "#ffa726"
                }
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 10
              }}
            />
          </Scroltable>
        )}
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
  return (
    <>
      <Container>
        <Text>Izin Tinggal</Text>
      </Container>
    </>
  );
};

const FourthRoute = () => {
  return (
    <>
      <Container>
        <Text>PNBP Lainnya</Text>
      </Container>
    </>
  );
};

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
const Container = styled.View`
  flex: 1;
  margin-bottom: 16px;
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
