import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import Menu from '../components/Buttons/Menu';
//import BaseMap from '../components/base-map.js';

class MyHomeScreen extends Component {
  render () {
    //console.log('HERE LIES HELLO', Hello);
    return (
      <View>
        <Text>HERE IS THE HOME SCREEN</Text>
        <Menu data={ this.props }/>
      </View>
    );
  }
}

export default MyHomeScreen;
