import React, {useState} from 'react';
import styled from 'styled-components/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';

export default function Administrasi() {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const state = {
    language: 'java',
  };
  return (
    <>
      <Container>
        <Text>Pilih Kategori</Text>
        <PickerContainer>
          <Picker
            selectedValue={state.language}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({language: itemValue})
            }>
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
          </Picker>
        </PickerContainer>
        <Row>
          <InputContainer onPress={() => setShow(!show)}>
            <>
              <Text>Tanggal</Text>
              <DateInput editable={false} />
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  display="default"
                  onChange={(event, selectedDate) =>
                    console.log(event, selectedDate)
                  }
                />
              )}
            </>
          </InputContainer>
          <BottonContainer>
            <ButtonNext>
              <ButtonLabel>Cari</ButtonLabel>
            </ButtonNext>
          </BottonContainer>
        </Row>
        <Category>
          <CategoryContainer>
            <CategoryText>1. Visa</CategoryText>
          </CategoryContainer>
          <ChildrenContainer>
            <ChildrenText>a. Visa Tinggal Terbatas</ChildrenText>
            <ChildenRow>
              <ChildrenInputContainer>
                <ChildrenInputLabel>Jumlah Pria</ChildrenInputLabel>
                <ChildrenInput />
              </ChildrenInputContainer>
              <ChildrenInputContainer>
                <ChildrenInputLabel>Jumlah Wanita</ChildrenInputLabel>
                <ChildrenInput />
              </ChildrenInputContainer>
              <ChildrenInputContainer>
                <ChildrenInputLabel>Total</ChildrenInputLabel>
                <ChildrenInput />
              </ChildrenInputContainer>
            </ChildenRow>
          </ChildrenContainer>
        </Category>

        <Category>
          <CategoryContainer>
            <CategoryText>1. Visa</CategoryText>
          </CategoryContainer>
          <ChildrenContainer>
            <ChildrenText>a. Visa Tinggal Terbatas</ChildrenText>
            <ChildenRow>
              <ChildrenInputContainer>
                <ChildrenInputLabel>Jumlah Pria</ChildrenInputLabel>
                <ChildrenInput />
              </ChildrenInputContainer>
              <ChildrenInputContainer>
                <ChildrenInputLabel>Jumlah Wanita</ChildrenInputLabel>
                <ChildrenInput />
              </ChildrenInputContainer>
              <ChildrenInputContainer>
                <ChildrenInputLabel>Total</ChildrenInputLabel>
                <ChildrenInput />
              </ChildrenInputContainer>
            </ChildenRow>
          </ChildrenContainer>
        </Category>

        <Category>
          <CategoryContainer>
            <CategoryText>1. Visa</CategoryText>
          </CategoryContainer>
          <ChildrenContainer>
            <ChildrenText>a. Visa Tinggal Terbatas</ChildrenText>
            <ChildenRow>
              <ChildrenInputContainer>
                <ChildrenInputLabel>Jumlah Pria</ChildrenInputLabel>
                <ChildrenInput />
              </ChildrenInputContainer>
              <ChildrenInputContainer>
                <ChildrenInputLabel>Jumlah Wanita</ChildrenInputLabel>
                <ChildrenInput />
              </ChildrenInputContainer>
              <ChildrenInputContainer>
                <ChildrenInputLabel>Total</ChildrenInputLabel>
                <ChildrenInput />
              </ChildrenInputContainer>
            </ChildenRow>
          </ChildrenContainer>
        </Category>
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
