import { StackNavigator } from 'react-navigation';
import Pin from '../containers/Pin';

export default StackNavigator(
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
