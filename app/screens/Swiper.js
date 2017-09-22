import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

import Swiper from 'react-native-swiper';

import styles from '../assets/styles/Tutorial.style';

const swiper = React.createClass({
  render: function() {
    return (
      <Swiper
        showsButtons={true}
        loop={false}
        index={0}
        showsPagination={false}
        >
        <Image
          source={{uri: 'http://esse.ee/images/about.jpg'}}
          style={styles.backgroundImage}>
        </Image>
        <Image
          source={{uri: 'http://esse.ee/images/techstack.jpg'}}
          style={styles.backgroundImage}>
        </Image>
        <Image
          source={{uri: 'http://esse.ee/images/legend.jpg'}}
          style={styles.backgroundImage}>
        </Image>
        <Image
          source={{uri: 'http://esse.ee/images/crime-icons.jpg'}}
          style={styles.backgroundImage}>
        </Image>
        <Image
          source={{uri: 'http://esse.ee/images/directions.jpg'}}
          style={styles.backgroundImage}>
        </Image>
        <Image
          source={{uri: 'http://esse.ee/images/alert.jpg'}}
          style={styles.backgroundImage}>
        </Image>
        <Image
          source={{uri: 'http://esse.ee/images/message.jpg'}}
          style={styles.backgroundImage}>
        </Image>
        <Image
          source={{uri: 'http://esse.ee/images/pin.jpg'}}
          style={styles.backgroundImage}>
        </Image>
        <Image
          source={{uri: 'http://esse.ee/images/heatmap-dark.jpg'}}
          style={styles.backgroundImage}>
          <View style={styles.textContainer}>
            <View>
              <Text style={styles.headline}>That's it!</Text>
              <Text style={styles.text}>Enjoy using our app and, please, stay safe.</Text>
            </View>
            <View style={styles.openAppContainer}>
              <Text style={styles.openApp} onPress={ () => this.props.navigation.navigate('Home')}>Start using app</Text>
            </View>
          </View>
        </Image>
      </Swiper>
    )
  }
});

export default swiper;
