import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';

export default class Hello extends Component {
  render () {
      console.log('AM I RUNNING');
    return (
      <Text>App has been imported</Text>
    );
  }
}

AppRegistry.registerComponent('WalkSafe', () => Hello);
