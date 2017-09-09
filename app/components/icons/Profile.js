import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../../assets/styles/Icons.styles';

const closeIcon = (<Icon name="close" size={30} color="#919191" />);

const Profile =
  <View style={styles.avatar}>
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <Image style={styles.profileImg} source={require('../../assets/safetydance.png')}/>
      <Text>{ closeIcon }</Text>
    </View>
    <Text style={styles.userName}>Pedo Bear</Text>
    <Text style={styles.userEmail}>pedo@bear.com</Text>
  </View>;

export default Profile;
