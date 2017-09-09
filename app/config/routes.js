import { DrawerNavigator, StackNavigator } from 'react-navigation';

import Landing from '../screens/Landing';
import MyHomeScreen from '../screens/Home';
import CallUber from '../screens/CallUber';
import Contacts from '../screens/Contacts';
import About from '../screens/About';
import Tutorial from '../screens/Tutorial';
import MyNineOneOne from '../screens/NineOneOne';

import Profile from '../components/icons/Profile';
import OrderUber from '../components/icons/Uber';
import Call911 from '../components/icons/Call911';
import EmergencyContacts from '../components/icons/EmergencyContacts';
import AboutIcon from '../components/icons/About';
import LogoutIcon from '../components/icons/Logout';
import TutorialIcon from '../components/icons/Tutorial';

import Logout from '../components/buttons/Logout';

export const HomeScreen = DrawerNavigator({
  Home: {
    screen: MyHomeScreen,
    navigationOptions: {
      drawerLabel: Profile,
    },
  },
  Uber: {
    screen: CallUber,
    navigationOptions: {
      drawerLabel: OrderUber,
    },
  },
  NineOneOne: {
    screen: MyNineOneOne,
    navigationOptions: {
      drawerLabel: Call911,
    },
  },
  Contacts: {
    screen: Contacts,
    navigationOptions: {
      drawerLabel: EmergencyContacts,
    },
  },
  About: {
    screen: About,
    navigationOptions: {
      drawerLabel: AboutIcon,
    },
  },
  Tutorial: {
    screen: Tutorial,
    navigationOptions: {
      drawerLabel: TutorialIcon,
    },
  },
  Logout: {
    screen: Logout,
    navigationOptions: {
      drawerLabel: LogoutIcon,
    },
  },
}, {
  headerMode: 'none',
});

export const Root = StackNavigator({
  Landing: {
    screen: Landing,
  },
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
}, {
  headerMode: 'none',
});
