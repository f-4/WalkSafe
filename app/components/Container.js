import { View, StyleSheet } from 'react-native';
import React, { Component, PropTypes } from 'react';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class Container extends Component {
  render() {
    return (
      <View style={styles.container}>
        {this.props.children}
      </View>
    );
  }
}

export default Container;
