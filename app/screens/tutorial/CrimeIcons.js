import React, { Component } from 'react';
import {
  Text,
  Image,
  View,
  StyleSheet
} from 'react-native';
import styles from '../../assets/styles/Tutorial.style';
import forwardArrow from '../../components/icons/ForwardArrow';

class About extends Component {

  render() {
    return (
      <Image
        source={{uri: 'http://esse.ee/images/about.jpg'}}
        style={styles.backgroundImage}>
        <View style={styles.buttonBackgroundLight}>
          <Text style={styles.text} onPress={ () => this.props.navigation.navigate('Heatmap')}>{ forwardArrow }</Text>
        </View>
      </Image>
    )
  }
}
export default About;
