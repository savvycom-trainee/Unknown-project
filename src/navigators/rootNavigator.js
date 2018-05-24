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
    initialRouteName: 'Auth',
    mode: 'card',
    tabBarVisible: false,
    headerMode: 'none',
  },
);
