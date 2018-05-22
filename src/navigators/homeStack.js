import { createStackNavigator } from 'react-navigation';
import Home from '../containers/Home';
import HomeDetail from '../containers/HomeDetail';
import Direct from '../containers/Direct';

export default createStackNavigator(
  {
    Home: {
      screen: Home,
    },
    HomeDetail: {
      screen: HomeDetail,
    },
    Direct: {
      screen: Direct,
    },
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
  },
);
