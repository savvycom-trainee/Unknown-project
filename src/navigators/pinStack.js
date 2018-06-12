import { createStackNavigator } from 'react-navigation';
import Pin from '../containers/Pin';

export default createStackNavigator(
  {
    Pin: {
      screen: Pin,
    },
  },
  {
    initialRouteName: 'Pin',
    headerMode: 'none',
  },
);
