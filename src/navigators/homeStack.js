import { createStackNavigator } from 'react-navigation';
import Home from '../containers/Home';
// import HomeDetail from '../containers/HomeDetail';
import Account from '../containers/Account';
import FindAround from '../containers/FindAround';
import { ResetPassword, UpdateUser } from '../components';

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
    Change: {
      screen: ResetPassword,
    },
    UpdateUser1: {
      screen: UpdateUser,
    },
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
  },
);
