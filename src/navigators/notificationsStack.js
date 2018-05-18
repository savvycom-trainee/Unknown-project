import { createStackNavigator } from 'react-navigation';
import Notifications from '../containers/Notifications';

export default createStackNavigator(
  {
    Notifications: {
      screen: Notifications,
    },
  },
  {
    initialRouteName: 'Notifications',
    tabBarVisible: false,
    headerMode: 'none',
  },
);
