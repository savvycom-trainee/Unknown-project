import { createStackNavigator } from 'react-navigation';
import Notifications from '../containers/Notifications';
import User from '../containers/User';

export default createStackNavigator(
  {
    Notifications: {
      screen: Notifications,
    },
    User: {
      screen: User,
    },
  },
  {
    initialRouteName: 'Notifications',
    tabBarVisible: false,
    headerMode: 'none',
  },
);
