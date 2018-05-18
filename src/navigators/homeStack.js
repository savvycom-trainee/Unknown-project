import { createStackNavigator } from 'react-navigation';
import Home from '../containers/Home';
import HomeDetail from '../containers/HomeDetail';

export default createStackNavigator(
  {
    Home: {
      screen: Home,
    },
    HomeDetail: {
      screen: HomeDetail,
    },
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
  },
);
