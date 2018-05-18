import { createStackNavigator } from 'react-navigation';
import MapScreen from '../containers/MapScreen';

export default createStackNavigator(
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
