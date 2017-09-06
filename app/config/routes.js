import React from 'react';
import { DrawerNavigator, StackNavigator } from 'react-navigation';

import Landing from '../screens/Landing';
import MyHomeScreen from '../screens/Home';
import MyNotificationsScreen from '../screens/Notifications';
import MyNineOneOne from '../screens/NineOneOne';

export const HomeScreen = DrawerNavigator({
  Home: {
    screen: MyHomeScreen,
    navigationOptions: {
      drawerLabel: 'Home'
    },
  },
  Notifications: {
    screen: MyNotificationsScreen,
    navigationOptions: {
      drawerLabel: 'Notifications'
    },
  },
  NineOneOne: {
    screen: MyNineOneOne,
    navigationOptions: {
      drawerLabel: '911'
    },
  }
}, {
  headerMode: 'none'
});

export const Root = StackNavigator({
  Landing: {
    screen: Landing
  },
  Home: {
    screen: HomeScreen
  }
}, {
  headerMode: 'none'
});
