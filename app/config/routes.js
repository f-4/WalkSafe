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
      drawerLabel: 'Home',
      gesturesEnabled: false
    },
  },
  Notifications: {
    screen: MyNotificationsScreen,
    navigationOptions: {
      drawerLabel: 'Notifications',
      gesturesEnabled: false
    },
  },
  NineOneOne: {
    screen: MyNineOneOne,
    navigationOptions: {
      drawerLabel: '911',
      gesturesEnabled: false
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
    screen: HomeScreen,
    navigationOptions: {
      gesturesEnabled: false
    },
  }
}, {
  headerMode: 'none'
});
