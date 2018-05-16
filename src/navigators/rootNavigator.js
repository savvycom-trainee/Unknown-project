import { SwitchNavigator } from 'react-navigation';
import Home from '../containers/Home';

export default SwitchNavigator(
  {
    Home: {
      screen: Home,
    },
  },
  {
    initialRouteName: 'Home',
    mode: 'card',
    tabBarVisible: false,
    headerMode: 'none',
  },
);
