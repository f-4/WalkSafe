import React from 'react';
import { DrawerNavigator } from 'react-navigation';

import MyHomeScreen from '../screens/Home';
import MyNotificationsScreen from '../screens/Notifications';

export const Root = DrawerNavigator({
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
  }
});
