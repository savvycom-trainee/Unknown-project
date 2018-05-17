import { StackNavigator } from 'react-navigation';
import MapScreen from '../containers/MapScreen';

export default StackNavigator(
  {
    MapScreen: {
      screen: MapScreen,
    },
  },
  {
    initialRouteName: 'MapScreen',
    tabBarVisible: false,
    headerMode: 'none',
  },
);
