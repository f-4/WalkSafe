import React, { Component } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import style from '../assets/styles/Contacts.style';
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
        <View>
          <Image
            style={styles.image}
            source={{uri: 'http://esse.ee/images/about.jpg'}}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    height: '99%'
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // width: null,
    // height: null
  }
})

export default About;
