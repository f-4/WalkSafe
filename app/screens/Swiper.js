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

class swiper extends Component {

    _renderItem (url) {
      return (
        <Image
          source={{uri: url}}
          style={styles.backgroundImage}>
        </Image>
      );
    }

  render () {
    return (
      <Swiper
        showsButtons={true}
        loop={false}
        index={0}
        showsPagination={false}>
        { this._renderItem('http://esse.ee/images/about.jpg') }
        { this._renderItem('http://esse.ee/images/techstack.jpg') }
        { this._renderItem('http://esse.ee/images/legend.jpg') }
        { this._renderItem('http://esse.ee/images/crime-icons.jpg') }
        { this._renderItem('http://esse.ee/images/directions.jpg') }
        { this._renderItem('http://esse.ee/images/alert.jpg') }
        { this._renderItem('http://esse.ee/images/message.jpg') }
        { this._renderItem('http://esse.ee/images/pin.jpg') }
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
};

export default swiper;
