import React, { useRef, useState } from 'react';
import styled from 'styled-components/native';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";

export default function Home({ navigation }) {
    const pieData = [
        {
            name: 'Seoul',
            population: 21500000,
            color: 'rgba(131, 167, 234, 1)',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
        },
        {
            name: 'Toronto',
            population: 2800000,
            color: '#F00',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
        },
        {
            name: 'Beijing',
            population: 527612,
            color: 'red',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
        },
        {
            name: 'New York',
            population: 8538000,
            color: '#ffffff',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
        },
        {
            name: 'Moscow',
            population: 11920000,
            color: 'rgb(0, 0, 255)',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
        },
    ];

    return (
        <>
            <Container>
                <TitleApp>Home Screen</TitleApp>
                <PieChart
                    data={pieData}
                    width={200}
                    height={200}
                    chartConfig={chartConfig}
                    accessor="population"
                    backgroundColor="transparent"
                    paddingLeft="10"
                    absolute
                />
                <TextInfo>Kantor Wilayah Bangka Belitung</TextInfo>
            </Container>
        </>
    );
}

const Container = styled.View`
  flex: 1;
  padding-horizontal: 16px;
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
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 0) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };