import React from 'react';
import { StatusBar } from 'react-native';
import { store, persistor } from './src/store/store';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Login from './src/pages/Login';
import Report from './src/pages/Report';
import Home from './src/pages/Home';
import Profile from './src/pages/Profile';
import Loading from './src/components/Loading';
import Toast from './src/components/Toast';
import Administrasi from './src/pages/Administrasi';
import Icon from 'react-native-vector-icons/dist/Ionicons';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator()

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#f8f9fa',
  },
};

const TabNav = () => {
  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'home') {
              iconName = focused
                ? 'home'
                : 'home-outline';
            } else if (route.name === 'administrasi') {
              iconName = focused ? 'clipboard' : 'clipboard-outline';
            } else if (route.name === 'report') {
              iconName = focused ? 'layers' : 'layers-outline'
            } else if (route.name === 'profile') {
              iconName = focused ? 'man': 'man-outline' 
            }

            // You can return any component that you like here!
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="home" component={Home} />
        <Tab.Screen name="administrasi" component={Administrasi} />
        <Tab.Screen name="report" component={Report} />
        <Tab.Screen name="profile" component={Profile} />
      </Tab.Navigator>
      {/* <Drawer.Navigator initialRouteName="home" theme={MyTheme}>
        <Drawer.Screen
          name="home"
          component={Home}
          options={{ drawerLabel: 'Home', headerTitle:"Home", drawerIcon:({focused, size}) => (
            <Icon
              name="home"
              size={size}
              color={focused ? '#7cc' : '#ccc'}
            />
          ), }}
        />
        <Drawer.Screen
          name="administrasi"
          component={Administrasi}
          options={{ drawerLabel: 'Administrasi', headerTitle:"Administrasi", drawerIcon:({focused, size}) => (
            <Icon
              name="clipboard"
              size={size}
              color={focused ? '#7cc' : '#ccc'}
            />
          ), }}
        />
        <Drawer.Screen
          name="report"
          component={Report}
          options={{ drawerLabel: 'Report', headerTitle:"Report", drawerIcon:({focused, size}) => (
            <Icon
              name="database"
              size={size}
              color={focused ? '#7cc' : '#ccc'}
            />
          ), }}
        />
        <Drawer.Screen
          name="LogOut"
          component={Report}
          options={{ drawerLabel: 'Report', headerTitle:"Report", drawerIcon:({focused, size}) => (
            <Icon
              name="database"
              size={size}
              color={focused ? '#7cc' : '#ccc'}
            />
          ), }}
        />
      </Drawer.Navigator> */}
    </>
  );
};

const Nav = () => {
  const loading = useSelector((state) => state.loading);
  const toast = useSelector((state) => state.toast);
  const accessToken = useSelector((state) => state.accessToken);
  const dataUser = useSelector((state) => state.user);
  return (
    <>
      {/* <StatusBar hidden={loading} /> */}
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator>
          {accessToken === null && dataUser === null ? (
            <Stack.Screen
              name="login"
              component={Login}
              options={{ headerShown: false }}
            />
          ) : (
              <Stack.Screen
                name="index"
                component={TabNav}
                options={{headerTitle:"SIKOK"}}
              />
            )}
        </Stack.Navigator>
      </NavigationContainer>
      {loading && <Loading />}
      {toast && <Toast {...toast} />}
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
