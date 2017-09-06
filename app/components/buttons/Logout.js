import React, { Component } from 'react';
import { View, Button } from 'react-native';

class Logout extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View>
        <Button
          onPress={ () => this.props.data.navigation.navigate('Home') }
          title="Logout"/>
      </View>
    )
  }
}

export default Logout;
