// import React, { Component } from 'react';
// import { Text, View } from 'react-native';

// import Login from '../components/buttons/Login';
// import Signup from '../components/buttons/Signup';

// class Landing extends Component {
//   constructor(props, context) {
//     super(props, context);
//     this.state = {
//       user: undefined, // user has not logged in yet
//     };
//   }

//   render() {
//     console.log('Landing page props', this.props);
//     return (
//       <View>
//         <Text>WalkSafe</Text>
//         <Login data={this.props} />
//         <Signup data={this.props} />
//       </View>
//     );
//   }
// }
// export default Landing;

import React, { Component } from 'react';
import {
  AsyncStorage,
  Button,
  Image,
  Linking,
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import RNRestart from 'react-native-restart';
import { FACEBOOK_URL, GOOGLE_URL } from 'react-native-dotenv';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import Home from '../components/buttons/Home';
import styles from '../assets/styles/Landing.style';

import Login from '../components/buttons/Login';

class Landing extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      user: undefined, // user has not logged in yet
    };

    this.handleOpenURL = this.handleOpenURL.bind(this);
    this.loginWithGoogle = this.loginWithGoogle.bind(this);
    this.loginWithFacebook = this.loginWithFacebook.bind(this);
    this.openURLhandler = this.openURLhandler.bind(this);
  }

  componentWillMount() {
    // Check if user was already logged in
    AsyncStorage.getItem('userObjectStr')
      .then((userObjectStr) => {
        console.log('Does this user string string exist', userObjectStr);
        if (userObjectStr) {
          let user = JSON.parse(userObjectStr);
          this.setState({
            user: user
          });
          //Navigate straight to Home screen if they were
          this.props.navigation.navigate('Home');
        }
      })
      .catch((err) => {
        //Console an error if they weren't logged in
        console.error('User is not logged in yet', err);
      });
  }

  componentDidMount() {
    Linking.addEventListener('url', this.handleOpenURL);
    // Launched from an external URL
    Linking.getInitialURL().then((url) => {
      if (url) {
        this.handleOpenURL({ url });
      }
    });

  };


  componentWillUnmount() {
    // Remove event listener
    Linking.removeEventListener('url', this.handleOpenURL);
  }

  handleOpenURL({ url }) {
    // Scrub google/facebook data from url
    const [, user_string] = url.match(/user=([^#]+)/);
    // Decode the user string and parse it into JSON
    const userObject = JSON.parse(decodeURI(user_string));
    const userObjectStr = decodeURI(user_string);

    // Set up Google or Facebook Id and save into userId
    const facebookId = userObject.facebook_id;
    const googleId = userObject.google_id;
    const userId = facebookId || googleId;

    console.log('What is the facebook_id', facebookId);
    console.log('What is the google_id', googleId);
    console.log('What is the userId', userId);

    // Scrub token data from url and remove first three characters
    const userTokenUrlFirst = url.match(/token=([^#]+)(?=&user)/)[1].substring(3);
    // Remove last three characters
    const userTokenUrl = userTokenUrlFirst.substring(0, userTokenUrlFirst.length - 3);

    // insert JWToken and userId into the AsycStorage
    AsyncStorage.multiSet([['userToken', userTokenUrl], ['userId', userId], ['userObject', userObjectStr]])
      .then(() => {
        this.setState({
          user: userObject
        });
      })
      .catch((err) => {
        console.log('AsyncStorage error', err);
      })
  }

  // Handle Login with Facebook button tap
  loginWithFacebook() {
    console.log('here is the FB URL:', FACEBOOK_URL);
    this.openURLhandler(FACEBOOK_URL);
  }

  // Handle Login with Google button tap
  loginWithGoogle() {
    console.log('here is the Google URL:', GOOGLE_URL);
    this.openURLhandler(GOOGLE_URL);
  }

  openURLhandler(url) {
    Linking.openURL(url);
  }

  render() {
    const { user } = this.state;
    console.log('line 98', this.state);
    return (
      <LinearGradient
        style={styles.container}
        colors={[colors.background1, colors.background2]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        { user
          ? // Show user info if already logged in
            <View style={styles.content}>
              <Text style={styles.header}>
                Welcome {user.name}!
              </Text>
              <View style={styles.avatar}>
                <Image source={{ uri: user.avatar }} style={styles.avatarImage} />
              </View>
              <Home data={this.props} />
            </View>
          : // Show Please log in message if not
            <View style={styles.content}>
              <Text style={styles.header}>
                Welcome Stranger!
              </Text>
              <View style={styles.avatar}>
                <Image source={require('../assets/safetydance.png')} style={styles.avatarImage} />
              </View>
              <Text style={styles.text}>
                Please log in to continue {'\n'}
                to WalkSafe
              </Text>
              <View style={styles.buttons}>
                <Icon.Button
                  name="facebook"
                  backgroundColor="#3b5998"
                  onPress={this.loginWithFacebook}
                  {...iconStyles}
                >
                  Login with Facebook
                </Icon.Button>
                <Login data={this.props} />
                <Icon.Button
                  name="google"
                  backgroundColor="#DD4B39"
                  onPress={this.loginWithGoogle}
                  {...iconStyles}
                >
                  Login with Google
                </Icon.Button>
              </View>
            </View>
          }
        </LinearGradient>
    );
  }
}

const iconStyles = {
  borderRadius: 10,
  iconStyle: { paddingVertical: 5 },
};

const colors = {
  black: '#1a1917',
  gray: '#888888',
  background1: '#B721FF',
  background2: '#21D4FD'
};

export default Landing;
