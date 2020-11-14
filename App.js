import React from 'react';
import {StatusBar} from 'react-native';
import {store, persistor} from './src/store/store';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Provider, useSelector} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Login from './src/pages/Login';
import Report from './src/pages/Report';
import Home from './src/pages/Home';
import Loading from './src/components/Loading';
import Administrasi from './src/pages/Administrasi';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

const DrawerNav = () => {
  return (
    <>
      <Drawer.Navigator initialRouteName="home">
        <Drawer.Screen
          name="home"
          component={Home}
          options={{drawerLabel: 'Home'}}
        />
        <Drawer.Screen
          name="administrasi"
          component={Administrasi}
          options={{drawerLabel: 'Administrasi'}}
        />
        <Drawer.Screen name="report" component={Report} />
      </Drawer.Navigator>
    </>
  );
};

const Nav = () => {
  const loading = useSelector((state) => state.loading);
  const accessToken = useSelector((state) => state.accessToken);
  return (
    <>
      {/* <StatusBar hidden={loading} /> */}
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator>
          {accessToken === null ? (
            <Stack.Screen
              name="login"
              component={Login}
              options={{headerShown: false}}
            />
          ) : (
            <Stack.Screen
              name="index"
              component={DrawerNav}
              options={{headerShown: false}}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
      {loading && <Loading />}
    </>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Nav />
      </PersistGate>
    </Provider>
  );
};

export default App;
