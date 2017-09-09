import React, { Component } from 'react';
import { View, Button } from 'react-native';

class Logout extends Component {

  render() {
    return (
      <View>
        <Button
          onPress={() => console.log('Was touched')}
          title="Logout"
        />
      </View>
    );
  }
}

export default Logout;
