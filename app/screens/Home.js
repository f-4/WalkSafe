import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import BaseMap from '../components/base-map.js';

class MyHomeScreen extends Component {
  render() {
    return (
      <BaseMap data={this.props} />
    );
  }
}

export default MyHomeScreen;
