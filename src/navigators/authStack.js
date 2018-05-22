import { createStackNavigator } from 'react-navigation';
import Login from '../containers/Login';
import Loading from '../containers/Loading';

export default createStackNavigator(
  {
    Login: {
      screen: Login,
    },
    Loading: {
      screen: Loading,
    },
  },
  {
    initialRouteName: 'Loading',
    headerMode: 'none',
  },
);
