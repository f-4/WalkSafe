import React, { Component } from 'react';
import { View, Button } from 'react-native';

class Login extends Component {

  render() {
    return (
      <View>
        <Button
          onPress={() => this.props.data.navigation.navigate('Home')}
          title="Login"
        />
      </View>
    );
  }
}

export default Login;
