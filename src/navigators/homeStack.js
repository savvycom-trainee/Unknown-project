import { createStackNavigator } from 'react-navigation';
import Home from '../containers/Home';
import HomeDetailStack from './homeDetailStack';

export default createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarVisible: false,
      },
    },
    HomeDetailStack: {
      screen: HomeDetailStack,
    },
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
  },
);
