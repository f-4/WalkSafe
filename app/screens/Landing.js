import React, { Component } from 'react';
import { Text, View } from 'react-native';

import Login from '../components/Buttons/Login';
import Signup from '../components/Buttons/Signup';

class Landing extends Component {
  render () {
    return (
      <View>
        <Text>WalkSafe</Text>
        <Login data={ this.props }/>
        <Signup data={ this.props }/>
      </View>
    );
  }
}

export default Landing;
