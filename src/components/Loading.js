import React from 'react';
import styled from 'styled-components/native';
import Spinner from 'react-native-spinkit';

const Container = styled.SafeAreaView`
  background-color: rgba(0, 0, 0, 0.6);
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`;

// const Spinner = styled.ActivityIndicator``;

export default function Loading() {
  return (
    <Container>
      <Spinner color="#FFF" type="ThreeBounce" size={75} />
    </Container>
  );
}