import { createStackNavigator } from 'react-navigation';
import Home from '../containers/Home';
import HomeDetail from '../containers/HomeDetail';
import Account from '../containers/Account';

export default createStackNavigator(
  {
    Home: {
      screen: Home,
    },
    HomeDetail: {
      screen: HomeDetail,
    },
    Account: {
      screen: Account,
    },
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
  },
);
