import { StackNavigator } from 'react-navigation';
import Notifications from '../containers/Notifications';

export default StackNavigator(
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
