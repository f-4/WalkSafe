import React, { Component } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import style from '../assets/styles/Contacts.style';
import imageStyle from '../assets/styles/Tutorial.style';
import backArrow from '../components/icons/BackArrow';

class About extends Component {
  render() {
    return (
      <View>
        <View style={style.header}>
          <Text style={style.headerText} onPress={ () => this.props.navigation.navigate('DrawerOpen')}>{ backArrow }</Text>
          <Text style={style.headerText}>Meet the team</Text>
          <Text></Text>
        </View>
        <Image
          style={imageStyle.backgroundImage}
          source={{uri: 'http://esse.ee/images/about.jpg'}}
        />
      </View>
    );
  }
}

export default About;
