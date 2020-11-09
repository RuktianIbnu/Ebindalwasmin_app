import React from 'react';
import {StatusBar} from 'react-native';
import {store, persistor} from './src/store/store';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider, useSelector} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Login from './src/pages/Login';
import Report from './src/pages/Report';
import Home from './src/pages/Home';
import Loading from './src/components/Loading'

const Stack = createStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

console.disableYellowBox = true;

const Nav = () => {
  const loading = useSelector((state) => state.loading);
  const accessToken = useSelector((state) => state.accessToken);
  return (
    <>
      <StatusBar hidden={loading} />
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator>
          <Stack.Screen name="login" component={Login} options={{headerShown: false}}/>
          <Stack.Screen name="report" component={Report} options={{headerShown: false}}/>
          <Stack.Screen name="home" component={Home} options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
      {loading && <Loading/>}
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
