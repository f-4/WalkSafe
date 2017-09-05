import React from 'react';
import { DrawerNavigator, StackNavigator } from 'react-navigation';

import Landing from '../screens/Landing';
import MyHomeScreen from '../screens/Home';
import MyNotificationsScreen from '../screens/Notifications';

export const HomeScreen = DrawerNavigator({
  Home: {
    screen: MyHomeScreen,
    navigationOptions: {
      drawerLabel: 'Home',
      header: null
    },
  },
  Notifications: {
    screen: MyNotificationsScreen,
    navigationOptions: {
      drawerLabel: 'Notifications',
      header: null
    },
  }
});

export const Root = StackNavigator({
  Landing: {
    screen: Landing,
    navigationOptions: {
      drawerLabel: 'Home',
      header: null
    },
  },
  Home: {
    screen: HomeScreen
  }
});
