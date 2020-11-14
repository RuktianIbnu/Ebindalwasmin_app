import React, {useRef, useState, useEffect} from 'react';
import styled from 'styled-components/native';
import {View, Dimensions, StatusBar, Text} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import {Provider, useSelector} from 'react-redux';
import axios from 'axios';
import {BASE_URL} from '../helpers/global';

const FirstRoute = () => (
  <View style={{backgroundColor: '#ff4081', flex: 1, justifyContent: 'center'}}>
    <Text
      style={{
        color: '#FFFFFF',
        fontSize: 28,
        textAlign: 'center',
        fontWeight: 'bold',
      }}>
      Codeinsia
    </Text>
  </View>
);
const SecondRoute = () => (
  <View style={{backgroundColor: '#ff4081', flex: 1, justifyContent: 'center'}}>
    <Text
      style={{
        color: '#FFFFFF',
        fontSize: 28,
        textAlign: 'center',
        fontWeight: 'bold',
      }}>
      codeinsia.com
    </Text>
  </View>
);

const initialLayout = {width: Dimensions.get('window').width};

export default function Home({navigation}) {
  const [namalayanan, setNamaLayanan] = useState([]);
  const accessToken = useSelector((state) => state.accessToken);
  useEffect(() => {
    getNamaLayanan();
  }, []);
  const getNamaLayanan = async () => {
    try {
      const resNamaLayanan = await axios.get(
        BASE_URL + '/resources/pnbp-kategori',
        {headers: {Authorization: accessToken}},
      );
      const {success, status, message, data} = resNamaLayanan;
      setNamaLayanan(data);
      console.log(data);
    } catch (error) {
      console.log(error.response);
      alert(error.response);
    }
  };

  const [index, setIndex] = useState(0);

  const [routes] = useState([
    {key: 'first', title: 'First'},
    {key: 'second', title: 'Second'},
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  return (
    <>
      <Container>
        <StatusBar backgroundColor="#2196f3" barStyle="light-content" />
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
        />
      </Container>
    </>
  );
}

const Container = styled.View`
  flex: 1;
  padding-horizontal: 0px;
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

const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#08130D',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 0) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};
