import { SwitchNavigator } from 'react-navigation';
import Home from './tabHome';
import Auth from './authStack';

export default SwitchNavigator(
  {
    Home: {
      screen: Home,
    },
    Auth: {
      screen: Auth,
    },
  },
  {
    initialRouteName: 'Home',
    mode: 'card',
    tabBarVisible: false,
    headerMode: 'none',
  },
);
