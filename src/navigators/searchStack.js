import { StackNavigator } from 'react-navigation';
import Search from '../containers/Search';

export default StackNavigator(
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
