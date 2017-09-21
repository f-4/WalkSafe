import { DrawerNavigator, StackNavigator } from 'react-navigation';

import Landing from '../screens/Landing';
import MyHomeScreen from '../screens/Home';
import CallUber from '../screens/CallUber';
import Contacts from '../screens/Contacts';
import About from '../screens/About';
import Tutorial from '../screens/Tutorial';
import MyNineOneOne from '../screens/NineOneOne';
import DrawerMenu from '../screens/Menu';

import TutorialAbout from '../screens/tutorial/About';
import Heatmap from '../screens/tutorial/Heatmap';
import Legend from '../screens/tutorial/Legend';
import CrimeIcons from '../screens/tutorial/CrimeIcons';
import Techstack from '../screens/tutorial/Techstack';

const tutorialNavigator = StackNavigator({
  About: {
    screen: TutorialAbout
  },
  Heatmap: {
    screen: Heatmap
  },
  Legend: {
    screen: Legend
  },
  CrimeIcons: {
    screen: CrimeIcons
  },
  Techstack: {
    screen: Techstack
  },
}, {
  headerMode: 'none'
});

const stackNavigator = DrawerNavigator({
  Home: {
    screen: MyHomeScreen
  },
  Uber: {
    screen: CallUber
  },
  Contacts: {
    screen: Contacts
  },
  About: {
    screen: About
  },
  Tutorial: {
    screen: tutorialNavigator,
    navigationOptions: {
      gesturesEnabled: false,
    },
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
