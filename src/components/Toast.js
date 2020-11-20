import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Animated, {Easing} from 'react-native-reanimated';

const Container = styled.View`
  align-items: center;
  justify-content: flex-end;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100%;
`;

const Wrapper = styled(Animated.View)`
  background-color: ${({backgroundColor}) => backgroundColor || '#333'};
  width: 100%;
  justify-content: center;
  padding: 10px 0px 10px 0px;
`;

const Message = styled.Text`
  font-size: 12px;
  line-height: 20px;
  color: white;
  text-align: center;
`;

const Toast = ({success, message, closeToast}) => {
  const [animation, setAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.spring(animation, {
      toValue: 0,
      duration: 200,
      easing: Easing.inOut(Easing.ease),
    }).start();
    setTimeout(() => {
      if (closeToast) {
        Animated.spring(animation, {
          toValue: 0,
          duration: 200,
          easing: Easing.inOut(Easing.ease),
        }).start();
        closeToast();
      }
    }, 3000);
  }, [animation, closeToast]);

  return (
    <Container>
      <Wrapper
        style={{opacity: animation}}
        backgroundColor={success ? '#f4a261' : '#FF4949'}>
        <Message>{message}</Message>
      </Wrapper>
    </Container>
  );
};

Toast.propTypes = {
  success: PropTypes.bool,
  message: PropTypes.string,
  closeToast: PropTypes.func,
};

export default Toast;
