import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

class NineOneOne extends Component {
  render() {
    return (
      <View>
        <Button
          title="Test"
          onPress={() => console.log('Like a virgin, touched for the very first time')}
        />
      </View>
    );
  }
}

export default NineOneOne;
