import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../../assets/styles/Icons.styles';

const contactsIcon = (<Icon name="account-box" size={30} color="#919191" />);

const Contacts =
  <View style={styles.container}>
    <Text>{ contactsIcon }</Text>
    <Text style={styles.text}>Emergency Contacts</Text>
  </View>;

export default Contacts;
