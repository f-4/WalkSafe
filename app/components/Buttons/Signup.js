import React, { Component } from 'react';
import { View, Button } from 'react-native';

class Signup extends Component {

  render() {
    return (
      <View>
        <Button
          onPress={() => this.props.data.navigation.navigate('Home')}
          title="Signup"
        />
      </View>
    );
  }
}

export default Signup;
