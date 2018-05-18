import { createStackNavigator } from 'react-navigation';
import Search from '../containers/Search';

export default createStackNavigator(
  {
    Search: {
      screen: Search,
    },
  },
  {
    initialRouteName: 'Search',
    mode: 'card',
    tabBarVisible: false,
    headerMode: 'none',
  },
);
