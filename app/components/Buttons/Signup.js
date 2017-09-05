import React, { Component } from 'react';
import { View, Button } from 'react-native';
//import MyHomeScreen from '../../screens/Home';

class Signup extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log('line 11', this.props.data)
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
