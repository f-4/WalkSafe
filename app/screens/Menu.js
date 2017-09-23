import React, { Component } from 'react';
import {
  AsyncStorage,
  Image,
  Linking,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { HOST, PORT } from 'react-native-dotenv';
import RNRestart from 'react-native-restart';
import { COLOR, ThemeProvider, Toolbar, Drawer, Avatar } from 'react-native-material-ui';
import Container from '../components/Container';
import axios from 'axios';
import AvatarStyles from '../assets/styles/Icons.styles';
import Communications from 'react-native-communications';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const uiTheme = {
  fontFamily: 'Roboto',
  palette: {
    primaryColor: COLOR.cyan500,
    accentColor: COLOR.pink500,
  },
  toolbar: {
    container: {
      height: 50,
      paddingTop: 0,
    },
  },
  avatar: {
    container: {
      backgroundColor: '#333'
    }
  }
};

export default class DrawerMenu extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      name: '',
      avatar: '../assets/safetydance.png',
      email: null
    };
  }

  componentWillMount() {
    AsyncStorage.multiGet(['userToken', 'userId'])
      .then((userData) => {
        let token = userData[0][1];
        let userId = userData[1][1];

        // Set all axios headers in this component to have default header
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        // Set the initial userId state
        this.setState({
          userId: userId
        });
        // Retrieve user
        axios.get(`http://ec2-13-56-220-250.us-west-1.compute.amazonaws.com:3000/api/user/user`, {
          params: {
            userId: this.state.userId
          }
        })
          .then(res => {
            this.setState({
              name: res.data[0].username,
              avatar: res.data[0].avatar,
              email: res.data[0].email
            });
          })
          .catch(err => {
            console.error(err);
          });
      })
      .catch((err) => {
        console.error(err);
      });

  }


  onLogout = () => {
    AsyncStorage.multiRemove(['userToken', 'userId', 'userObject'])
      .then(() => {
        // Restarts the app and resets the states
        RNRestart.Restart()
      })
      .catch((err) => {
        console.error(err);
      })
  }

  openURLhandler() {
    Linking.openURL('uber://?action=setPickup');
  }


  render() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <Container>
          <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" translucent />
          <Toolbar
            leftElement="arrow-back"
            onLeftElementPress={() => this.props.navigation.navigate('Home')}
            centerElement="Menu"
          />
          <View style={styles.container}>
            <Drawer>
              <Drawer.Header>
                <Drawer.Header.Account
                  style={{
                    container: { backgroundColor: '#fafafa' },
                  }}
                  avatar={<Image style={AvatarStyles.profileImg} source={{uri: this.state.avatar}}/>}
                  footer={{
                    dense: true,
                    centerElement: {
                        primaryText: this.state.name,
                        secondaryText: this.state.email,
                    },
                  }}
                />
              </Drawer.Header>
              <Drawer.Section
                divider
                title="Actions"
                items={[
                  {
                    icon: 'directions-car', value: 'Order an Uber',
                    active: this.state.active == 'Uber',
                    onPress: () => { this.openURLhandler()},

                  },
                  {
                    icon: 'report', value: 'Call 911',
                    onPress: () => {
                      Communications.phonecall('+911', true);
                    },
                  },
                  {
                    icon: 'people', value: 'Emergency Contacts',
                    active: this.state.active == 'Contacts',
                    onPress: () => {
                      //this.setState({ active: 'Contacts' });
                      this.props.navigation.navigate('Contacts');
                    },
                  },
                ]}
              />
              <Drawer.Section
                title="About"
                items={[
                  {
                    icon: 'slideshow', value: 'Tutorial',
                    active: this.state.active == 'Tutorial',
                    onPress: () => {
                      //this.setState({ active: 'Tutorial' });
                      this.props.navigation.navigate('Tutorial');
                    },
                  },
                  {
                    icon: 'info', value: 'About',
                    active: this.state.active == 'About',
                    onPress: () => {
                      //this.setState({ active: 'About' });
                      this.props.navigation.navigate('About');
                    },
                  },
                  {
                    icon: 'input', value: 'Logout',
                    //active: this.state.active == '',
                    onPress: () => {
                      this.onLogout();
                    },
                  },
                ]}
              />
            </Drawer>
          </View>
        </Container>
      </ThemeProvider>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});
