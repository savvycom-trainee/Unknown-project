import { createStackNavigator } from 'react-navigation';
import Home from '../containers/Home';
// import HomeDetail from '../containers/HomeDetail';
import Account from '../containers/Account';
import FindAround from '../containers/FindAround';

export default createStackNavigator(
  {
    Home: {
      screen: Home,
    },
    // HomeDetail: {
    //   screen: HomeDetail,
    // },
    Account: {
      screen: Account,
    },
    FindAround: {
      screen: FindAround,
    },
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
  },
);
