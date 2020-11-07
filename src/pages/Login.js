import React, {useState} from 'react';
import styled from 'styled-components/native';
import imageMap from '../assets/images/map.png';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <Container>
        <TitleApp>e-Bindalwasmin</TitleApp>
        <MapImage source={imageMap} />
        <InputNipContainer>
          <InputNip placeholder="NIP" placeholderTextColor="#6e34a3" />
          <IconInputLeft name="account" color="#6e34a3" size={20} />
        </InputNipContainer>
        <InputPasswordContainer>
          <InputNip
            placeholder="Password"
            secureTextEntry={!showPassword}
            placeholderTextColor="#6e34a3"
          />
          <IconInputLeft name="lock" color="#6e34a3" size={20} />
          {showPassword ? (
            <IconInputRight
              onPress={() => setShowPassword(!showPassword)}
              name="eye-off"
              color="#6e34a3"
              size={20}
            />
          ) : (
            <IconInputRight
              onPress={() => setShowPassword(!showPassword)}
              name="eye"
              color="#6e34a3"
              size={20}
            />
          )}
        </InputPasswordContainer>
        <LoginButton onPress={() => console.log('Pressed')}>
          <LoginButtonText>Login</LoginButtonText>
        </LoginButton>
        <TextInfo>Kantor Wilayah Bangka Belitung</TextInfo>
      </Container>
    </>
  );
}

const TextInfo = styled.Text`
  text-align: center;
`;

const LoginButtonText = styled.Text`
  color: white;
  text-transform: uppercase;
`;
const LoginButton = styled.TouchableOpacity`
  background-color: #6f35a4;
  border-radius: 50px;
  padding-horizontal: 20px;
  padding-vertical: 20px;
  align-items: center;
  margin-bottom: 25px;
`;
const IconInputRight = styled(MaterialIcon)`
  position: absolute;
  top: 18;
  right: 20;
`;
const IconInputLeft = styled(MaterialIcon)`
  position: absolute;
  top: 18;
  left: 20;
`;
const InputPasswordContainer = styled.View`
  margin-bottom: 25px;
`;
const InputNipContainer = styled.View`
  margin-bottom: 20px;
  margin-top: 10px;
`;
const InputNip = styled.TextInput`
  background-color: #f0e6ff;
  border-radius: 50px;
  padding-left: 45px;
  padding-vertical: 15px;
  color: #6e34a3;
`;
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

const MapImage = styled.Image`
  width: 100%;
  height: 200px;
  resize-mode: contain;
  margin-top: 20px;
`;
