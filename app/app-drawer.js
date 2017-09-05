import React, { Component } from 'react';
import { AppRegistry, Text, View, Button, Image } from 'react-native';
import { DrawerNavigator } from 'react-navigation';

class MyHomeScreen extends Component {
  static navigationOptions = {
    drawerLabel: 'Home'
    };
    render () {
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
      <View>
        <Text>HERE IS THE NOTIFICATIONS SCREEN</Text>
        <Button
          onPress={ () => this.props.navigation.navigate('DrawerOpen') }
          title="Go back home"/>
      </View>
    );
  }
}


const WalkSafe = DrawerNavigator({
  Home: { screen: MyHomeScreen },
  Notifications: { screen: MyNotificationsScreen },
});

AppRegistry.registerComponent('WalkSafe', () => WalkSafe);
