import React, {useRef, useState} from 'react';
import styled from 'styled-components/native';
import imageMap from '../assets/images/map.png';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {Alert} from 'react-native';
import {BASE_URL} from '../helpers/global';
import {setLoading, setAccessToken, setUser} from '../store/actionCreator';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const submit = async () => {
    try {
      dispatch(setLoading(true));
      const body = {
        email: email,
        password: password,
      };
      const response = await axios.post(BASE_URL + '/login', body);

      const {status, data} = response;

      if (status === 200) {
        console.log(data.data.user);
        dispatch(setUser(data.data.user));
        dispatch(setAccessToken(data.data.token));
        // Alert.alert('', 'Login Berhasil');
      }
    } catch (error) {
      dispatch(setLoading(false));
      console.log(error);
      Alert.alert('', 'Email atau password salah');
    }
  };

  return (
    <>
      <Container>
        <TitleApp>SISTEM INFORMASI ELEKTRONIK KEIMIGRASIAN (SIKOK)</TitleApp>
        <TextInfo>Kantor Wilayah Kemenkumham Bangka Belitung</TextInfo>
        <MapImage source={imageMap} />
        <InputEmailContainer>
          <InputEmail
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
            placeholderTextColor="#6e34a3"
          />
          <IconInputLeft name="account" color="#6e34a3" size={20} />
        </InputEmailContainer>
        <InputPasswordContainer>
          <InputEmail
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
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
        <LoginButton onPress={() => submit()}>
          <LoginButtonText>Login</LoginButtonText>
        </LoginButton>
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
  top: 18px;
  right: 20px;
`;
const IconInputLeft = styled(MaterialIcon)`
  position: absolute;
  top: 18px;
  left: 20px;
`;
const InputPasswordContainer = styled.View`
  margin-bottom: 25px;
`;
const InputEmailContainer = styled.View`
  margin-bottom: 20px;
  margin-top: 10px;
`;
const InputEmail = styled.TextInput`
  background-color: #f0e6ff;
  border-radius: 50px;
  padding-left: 45px;
  padding-vertical: 15px;
  color: #6e34a3;
`;
const Container = styled.ScrollView`
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
