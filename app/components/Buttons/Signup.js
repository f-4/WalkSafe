import React, { Component } from 'react';
import { View, Button } from 'react-native';

class Signup extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View>
        <Button
          onPress={ () => this.props.data.navigation.navigate('Home') }
          title="Signup"/>
      </View>
    )
  }
}

export default Signup;
