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

//     this.handleOpenURL = this.handleOpenURL.bind(this);
//     this.loginWithGoogle = this.loginWithGoogle.bind(this);
//     this.loginWithFacebook = this.loginWithFacebook.bind(this);
//     this.openURLhandler = this.openURLhandler.bind(this);
//   }

//   componentDidMount() {
//     console.log('What is this', this);
//     Linking.addEventListener('url', this.handleOpenURL);
//     // Launched from an external URL
//     Linking.getInitialURL().then((url) => {
//       if (url) {
//         this.handleOpenURL({ url });
//       }
//     });

//   };

// //console.log('for Rebase')
//   componentWillUnmount() {
//     // Remove event listener
//     Linking.removeEventListener('url', this.handleOpenURL);
//   }

//   handleOpenURL({ url }) {
//     // extract stringified user string out of the URL
//     const [, user_string] = url.match(/user=([^#]+)/);

//     this.setState({
//       // decode the user string and parse it into JSON
//       user: JSON.parse(decodeURI(user_string))
//     });
//   }

//   // Handle Login with Facebook button tap
//   loginWithFacebook() {
//     console.log('here is the FB URL:', FACEBOOK_URL);
//     this.openURLhandler(FACEBOOK_URL);
//   }

//   // Handle Login with Google button tap
//   loginWithGoogle() {
//     console.log('here is the Google URL:', GOOGLE_URL);
//     this.openURLhandler(GOOGLE_URL);
//   }

//   openURLhandler(url) {
//     Linking.openURL(url);
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
//
//console.log
// export default Landing;
console.log('.env')
import React, { Component } from 'react';
import {
  Image,
  Linking,
  StyleSheet,
  Platform,
  Text,
  View,
  Button
} from 'react-native';
import { FACEBOOK_URL, GOOGLE_URL } from 'react-native-dotenv';
import Icon from 'react-native-vector-icons/FontAwesome';
import Home from '../components/buttons/Home';

console.log('GOOOOOOGLE', GOOGLE_URL);

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

  componentDidMount() {
    console.log('What is this', this);
    Linking.addEventListener('url', this.handleOpenURL);
    // Launched from an external URL
    Linking.getInitialURL().then((url) => {
      if (url) {
        this.handleOpenURL({ url });
      }
    });

  };

<<<<<<< HEAD

=======

>>>>>>> Update landing ofr rebase
  componentWillUnmount() {
    // Remove event listener
    Linking.removeEventListener('url', this.handleOpenURL);
  }

  handleOpenURL({ url }) {
    // extract stringified user string out of the URL
    const [, user_string] = url.match(/user=([^#]+)/);

    this.setState({
      // decode the user string and parse it into JSON
      user: JSON.parse(decodeURI(user_string))
    });
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
      <View style={styles.container}>
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
                <Icon name="user-circle" size={100} color="rgba(0,0,0,.09)" />
              </View>
              <Text style={styles.text}>
                Please log in to continue {'\n'}
                to MapGruff
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
        </View>
    );
  }
}

const iconStyles = {
  borderRadius: 10,
  iconStyle: { paddingVertical: 5 },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    margin: 20,
  },
  avatarImage: {
    borderRadius: 50,
    height: 100,
    width: 100,
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  text: {
    textAlign: 'center',
    color: '#333',
    marginBottom: 5,
  },
  buttons: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    margin: 20,
    marginBottom: 30,
  },
});

export default Landing;
