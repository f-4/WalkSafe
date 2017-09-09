import React, { Component } from 'react';
import { View, Button } from 'react-native';

class Menu extends Component {

  render() {
    return (
      <View>
        <Button
          onPress={() => this.props.data.navigation.navigate('DrawerOpen')}
          title="Menu"
        />
      </View>
    );
  }
}

export default Menu;
