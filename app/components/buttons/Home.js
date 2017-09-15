import React, { Component } from 'react';
import { View, Button } from 'react-native';

class Home extends Component {
  render() {
    return (
      <View>
        <Button
          onPress={() => this.props.data.navigation.navigate('Home')}
          title="Continue to map and/or tutorial"
        />
      </View>
    );
  }
}

export default Home;
