import React, { Component } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';

class Heatmap extends Component {
  render() {
    return (
      <View>
        <View>
          <Image
            style={styles.image}
            source={{uri: 'http://esse.ee/images/heatmap.jpg'}}
          />
        </View>
        <Text onPress={ () => console.log('I WAS CLICKED')}>GOT IT</Text>
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

export default Heatmap;
