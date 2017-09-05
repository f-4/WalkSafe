import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import Menu from '../components/Buttons/Menu';
import BaseMap from '../components/base-map.js';

class MyHomeScreen extends Component {
  render () {
    return (
      <BaseMap />
    );
  }
}

export default MyHomeScreen;
