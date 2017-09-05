import React, { Component } from 'react';
import { View, Button } from 'react-native';

class Menu extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View>
        <Button
          onPress={ () => this.props.data.navigation.navigate('DrawerOpen') }
          title="Go to notifications"/>
      </View>
    )
  }
}

export default Menu;
