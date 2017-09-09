import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../../assets/styles/Icons.styles';

const closeIcon = (<Icon name="close" size={30} color="#919191" />);

const Close =
  <View style={styles.container}>
    <Text>{ closeIcon }</Text>
  </View>;

export default Close;
