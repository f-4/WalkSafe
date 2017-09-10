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
      primaryColor: COLOR.green500,
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
          />
          <View style={styles.container}>
            <Drawer>
              <Drawer.Header>
                <Drawer.Header.Account
                  style={{
                    container: { backgroundColor: '#fafafa' },
                  }}
                  avatar={<Image style={AvatarStyles.profileImg} source={require('../assets/safetydance.png')}/>}
                  accounts={[
                    { avatar: <Avatar text="P" /> },
                    { avatar: <Avatar text="B" /> },
                  ]}
                  footer={{
                    dense: true,
                    centerElement: {
                        primaryText: 'Pedo Bear',
                        secondaryText: 'pedo@bear.com',
                    },
                    rightElement: 'arrow-drop-down',
                  }}
                />
              </Drawer.Header>
              <Drawer.Section
                divider
                title="Actions"
                items={[
                  {
                    icon: 'directions-car', value: 'Order an Uber',
                    //active: this.state.active == 'bookmark',
                    onPress: () => {
                      this.setState({ active: 'bookmark' });
                      this.props.navigation.navigate('Uber');
                      console.log('I was pressed');
                    },
                  },
                  {
                    icon: 'report', value: 'Call 911',
                    active: this.state.active == 'calendar',
                    onPress: () => {
                      Communications.phonecall('+16508479115', true);
                    },
                  },
                  {
                    icon: 'people', value: 'Emergency Contacts',
                    active: this.state.active == 'client',
                    onPress: () => {
                      this.setState({ active: 'client' });
                      this.props.navigation.navigate('Client');
                    },
                  },
                ]}
              />
              <Drawer.Section
                title="About"
                items={[
                  {
                    icon: 'slideshow', value: 'Tutorial',
                    active: this.state.active == 'info',
                    onPress: () => {
                      this.setState({ active: 'info' });
                      this.props.navigation.navigate('Tutorial');
                    },
                  },
                  {
                    icon: 'info', value: 'About',
                    active: this.state.active == 'settings',
                    onPress: () => {
                      this.setState({ active: 'settings' });
                      this.props.navigation.navigate('Settings');
                    },
                  },
                  {
                    icon: 'input', value: 'Logout',
                    active: this.state.active == 'settings',
                    onPress: () => {
                      this.setState({ active: 'settings' });
                      this.props.navigation.navigate('Settings');
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
