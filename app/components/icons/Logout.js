import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../../assets/styles/Icons.styles';

const logoutIcon = (<Icon name="logout-variant" size={30} color="#919191" />);

const Logout =
  <View style={styles.container}>
    <Text>{ logoutIcon }</Text>
  </View>;

export default Logout;
