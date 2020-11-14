import styled from 'styled-components/native';
import { View, Dimensions, StatusBar, Text } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Provider, useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../helpers/global';
import React, { useRef, useState, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { StackedBarChart, XAxis, YAxis, Grid } from 'react-native-svg-charts';

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
    const [dataPerwilayah, setdataPerwilayah] = useState([]);
    const accessToken = useSelector((state) => state.accessToken);
    
    useEffect(() => {
        getdataPerwilayah()
    }, [])

    const getdataPerwilayah = async () => {
        try {
            const resData = await axios.get(BASE_URL + '/resources/paspor-pivot-perwilayah', { headers: { Authorization: accessToken } });
            const { success, status, message, data } = resData.data;
            console.log(resData.data);
            setdataPerwilayah(data);
        } catch (error) {
            console.log(error.response);
            alert(error.response)
        }
    }

    const data = [
        {
            month: new Date(2015, 0, 1),
            apples: 3840,
            bananas: 1920,
            cherries: 960,
            dates: 400,
            oranges: 400,
        },
        {
            month: new Date(2015, 1, 1),
            apples: 1600,
            bananas: 1440,
            cherries: 960,
            dates: 400,
        },
        {
            month: new Date(2015, 2, 1),
            apples: 640,
            bananas: 960,
            cherries: 3640,
            dates: 400,
        },
        {
            month: new Date(2015, 3, 1),
            apples: 3320,
            bananas: 480,
            cherries: 640,
            dates: 400,
        },
    ]

    const colors = ['#7b4173', '#a55194', '#ce6dbd', '#de9ed6'];
    const keys = ['apples', 'bananas', 'cherries', 'dates'];

    return (
        <>
            <Container>
                <Text>
                    Paspor
                </Text>
                {/* <YAxis
                    data={data.apples}
                    contentInset={contentInset}
                    svg={{
                        fill: 'grey',
                        fontSize: 10,
                    }}
                    numberOfTicks={10}
                    formatLabel={(value) => `${value}ºC`}
                /> */}
                <StackedBarChart
                    style={{ height: 200 }}
                    keys={keys}
                    colors={colors}
                    data={data}
                    showGrid={false}
                    contentInset={{ top: 30, bottom: 30 }}
                />
                <XAxis
                    style={{ marginHorizontal: 0 }}
                    data={data}
                    formatLabel={(value, index) => index}
                    contentInset={{ left: 10, right: 10 }}
                    svg={{ fontSize: 10, fill: 'black' }}
                />
            </Container>
        </>
    );
}

const SecondRoute = () => {
    return (
        <>
            <Container>
                <Text>
                    Visa
                </Text>
            </Container>
        </>
    );
}

const ThridRoute = () => {
    return (
        <>
            <Container>
                <Text>
                    Izin Tinggal
                </Text>
            </Container>
        </>
    );
}

const FourthRoute = () => {
    return (
        <>
            <Container>
                <Text>
                    PNBP Lainnya
                </Text>
            </Container>
        </>
    );
}

const screenWidth = styled.View`
    width: 100%
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

