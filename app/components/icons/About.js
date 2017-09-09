import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../../assets/styles/Icons.styles';

const infoIcon = (<Icon name="information-outline" size={30} color="#919191" />);

const About =
  <View style={styles.container}>
    <Text>{ infoIcon }</Text>
    <Text style={styles.text}>About</Text>
  </View>;

export default About;
