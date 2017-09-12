import React, { Component } from 'react';
import { StyleSheet, Text, StatusBar, View, Image } from 'react-native';
import { COLOR, ThemeProvider, Toolbar, Drawer, Avatar } from 'react-native-material-ui';
import Container from '../components/Container';
import AvatarStyles from '../assets/styles/Icons.styles';
import Communications from 'react-native-communications';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import uberIcon from '../components/icons/Uber';
import emergencyIcon from '../components/icons/Call911';

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
      active: 'people',
    };
  }

  _setInfoActive() {
    this.setState({ active: 'info' });
  }

  render() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <Container>
          <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" translucent />
          <Toolbar
            leftElement="arrow-back"
            onLeftElementPress={() => this.props.navigation.navigate('DrawerClose')}
            centerElement="Menu"
            searable={{
              autoFocus: true
            }}
          />
          <View style={styles.container}>
            <Drawer>
              <Drawer.Header>
                <Drawer.Header.Account
                  style={{
                    container: { backgroundColor: '#fafafa' },
                  }}
                  avatar={<Image style={AvatarStyles.profileImg} source={require('../assets/safetydance.png')}/>}
                  footer={{
                    dense: true,
                    centerElement: {
                        primaryText: 'Pedo Bear',
                        secondaryText: 'pedo@bear.com',
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
                    onPress: () => {
                      this.setState({ active: 'Uber' });
                      this.props.navigation.navigate('Uber');
                      console.log('I was pressed');
                    },
                  },
                  {
                    icon: 'report', value: 'Call 911',
                    onPress: () => {
                      Communications.phonecall('+123456789', true);
                    },
                  },
                  {
                    icon: 'people', value: 'Emergency Contacts',
                    active: this.state.active == 'Contacts',
                    onPress: () => {
                      this.setState({ active: 'Contacts' });
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
                      this.setState({ active: 'Tutorial' });
                      this.props.navigation.navigate('Tutorial');
                    },
                  },
                  {
                    icon: 'info', value: 'About',
                    active: this.state.active == 'About',
                    onPress: () => {
                      this.setState({ active: 'About' });
                      this.props.navigation.navigate('About');
                    },
                  },
                  {
                    icon: 'input', value: 'Logout',
                    //active: this.state.active == '',
                    onPress: () => {
                      //this.setState({ active: '' });
                      this.props.navigation.navigate('Landing');
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  header: {
    backgroundColor: '#455A64',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
