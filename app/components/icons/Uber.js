import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../../assets/styles/Icons.styles';

const uberIcon = (<Icon name="uber" size={30} color="#919191" />);

const Uber =
  <View>
    <View style={styles.container}>
      <Text>{ uberIcon }</Text>
      <Text style={styles.text}>Order an Uber</Text>
    </View>
  </View>;

export default Uber;
