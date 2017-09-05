import React, { Component } from 'react';
import { AppRegistry, Text, View, Button, Image } from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import BaseMap from './components/base-map.js'
import Hello from './hello'
import { WebView } from 'react-native'

class MyHomeScreen extends Component {
  static navigationOptions = {
    drawerLabel: 'Home'
    };
    render () {
      //console.log('HERE LIES HELLO', Hello);
      return (
        <View>
        <Text>HERE IS THE HOME SCREEN</Text>
          <Button
          onPress={ () => this.props.navigation.navigate('DrawerOpen') }
          title="Go to notifications"/>
        </View>
      );
    }
  }

class MyNotificationsScreen extends Component {
  static navigationOptions = {
    drawerLabel: 'Notifications'
  };
  render () {
    return (
        <BaseMap />
    );
  }
}


const WalkSafe = DrawerNavigator({
  Home: { screen: MyHomeScreen },
  Notifications: { screen: MyNotificationsScreen },
});

AppRegistry.registerComponent('WalkSafe', () => WalkSafe);


//<Button onPress={ () => this.props.navigation.navigate('DrawerOpen') } title="Go back home"/>
