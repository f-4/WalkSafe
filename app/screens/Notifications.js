import React, { Component } from 'react';
import { Text, View, Button, Image } from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import BaseMap from '../components/base-map.js';

class MyNotificationsScreen extends Component {
  render () {
    return (
        <BaseMap />
    );
  }
}

export default MyNotificationsScreen;
