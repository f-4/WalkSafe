import React, { Component } from 'react';
import { Text, View } from 'react-native';

import Login from '../components/buttons/Login';
import Signup from '../components/buttons/Signup';

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
