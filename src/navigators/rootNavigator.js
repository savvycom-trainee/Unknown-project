import { createSwitchNavigator } from 'react-navigation';
import Home from './tabHome';
import Auth from './authStack';

export default createSwitchNavigator(
  {
    Home: {
      screen: Home,
    },
    Auth: {
      screen: Auth,
    },
  },
  {
    // TODO change Home to Auth when has asyncStorage
    initialRouteName: 'Home',
    mode: 'card',
    tabBarVisible: false,
    headerMode: 'none',
  },
);
