import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../../assets/styles/Icons.styles';

const tutorialIcon = (<Icon name="comment-question-outline" size={30} color="#919191" />);

const Tutorial =
  <View style={styles.container}>
    <Text>{ tutorialIcon }</Text>
    <Text style={styles.text}>Tutorial</Text>
  </View>;

export default Tutorial;
