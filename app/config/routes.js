import { DrawerNavigator, StackNavigator } from 'react-navigation';

import Landing from '../screens/Landing';
import MyHomeScreen from '../screens/Home';
import Contacts from '../screens/Contacts';
import About from '../screens/About';
import DrawerMenu from '../screens/Menu';
import Swiper from '../screens/Swiper';

const stackNavigator = DrawerNavigator({
  Home: {
    screen: MyHomeScreen
  },
  Contacts: {
    screen: Contacts
  },
  About: {
    screen: About
  },
  Tutorial: {
    screen: Swiper,
  },
}, {
  contentComponent: DrawerMenu,
});

export const Root = StackNavigator({
  Landing: {
    screen: Landing
  },
  Stack: {
    screen: stackNavigator
  }
}, {
  headerMode: 'none'
});
