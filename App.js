import React from 'react';
import {StatusBar} from 'react-native';
import {store, persistor} from './src/store/store';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider, useSelector} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Login from './src/pages/Login';

const Stack = createStackNavigator();

console.disableYellowBox = true;

const Nav = () => {
  const loading = useSelector((state) => state.loading);
  const accessToken = useSelector((state) => state.accessToken);
  return (
    <>
      <StatusBar hidden={loading} />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="loading" component={Login} />
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
