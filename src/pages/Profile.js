import React from 'react'
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/Ionicons'
import { useDispatch, useSelector } from 'react-redux'
import { setAccessToken, setUser } from '../store/actionCreator'

export default function Profile() {
    const dispatch = useDispatch()
    const Logout = () => {
        dispatch(setAccessToken(null))
    }

    const DataUser = useSelector((state) => state.user);
    console.log(DataUser)
    return (
        <>
            <Container>
                <Icon name="person-circle" size={150} color="#2f3e46" />
                <Name>{DataUser.name}</Name>
                <Email>{DataUser.email}</Email>
                <Kantor>{DataUser.nama_kantor}</Kantor>
                <Kantor>{DataUser.id_kantor}</Kantor>
                <Button onPress={Logout}>
                    <ButtonText>Keluar</ButtonText>
                </Button>
            </Container>
        </>
    )
}

const Kantor = styled.Text`
color:#0c0f0a;
`

const ButtonText = styled.Text`
color: #FFF;
font-weight:bold;
font-size:16px;
`
const Button = styled.TouchableOpacity`
background-color:#013a63;
width:100%;
padding-vertical:8px;
padding-horizontal:16px;
border-radius:10px;
align-items:center;
justify-content:center;
margin-top:20px;
`
const Email = styled.Text`
color:#a1a1a1;
`
const Name = styled.Text`
font-size:28px;
font-weight: bold;
`
const Container = styled.View`
flex:1;
padding-horizontal:16px;
align-items:center;
`