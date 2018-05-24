import { createStackNavigator } from 'react-navigation';
import Home from '../containers/Home';
import HomeDetail from '../containers/HomeDetail';
import Direct from '../containers/Direct';
import Account from '../containers/Account';

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
    Account: {
      screen: Account,
    },
  },
  {
    initialRouteName: 'Account',
    headerMode: 'none',
  },
);
