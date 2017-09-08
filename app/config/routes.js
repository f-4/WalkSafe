//import React from 'react';
import { DrawerNavigator, StackNavigator } from 'react-navigation';

import Landing from '../screens/Landing';
import MyHomeScreen from '../screens/Home';
import CallUber from '../screens/CallUber';
import Contacts from '../screens/Contacts';
import About from '../screens/About';
import MyNineOneOne from '../screens/NineOneOne';
import Logout from '../components/buttons/Logout';

export const HomeScreen = DrawerNavigator({
  Home: {
    screen: MyHomeScreen,
    navigationOptions: {
      drawerLabel: 'Home',
    },
  },
  Uber: {
    screen: CallUber,
    navigationOptions: {
      drawerLabel: 'Get an Uber ride',
    },
  },
  NineOneOne: {
    screen: MyNineOneOne,
    navigationOptions: {
      drawerLabel: '911',
    },
  },
  Contacts: {
    screen: Contacts,
    navigationOptions: {
      drawerLabel: 'Emergency Contacts',
    },
  },
  About: {
    screen: About,
    navigationOptions: {
      drawerLabel: 'About',
    },
  },
  Logout: {
    screen: Logout,
    navigationOptions: {
      drawerLabel: 'Logout',
    },
  },
}, {
  headerMode: 'none',
});

export const Root = StackNavigator({
  Landing: {
    screen: Landing,
  },
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
}, {
  headerMode: 'none',
});
