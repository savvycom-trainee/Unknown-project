import { createStackNavigator } from 'react-navigation';
import Login from '../containers/Login';
import Signup from '../containers/Signup';
import Loading from '../containers/Loading';

export default createStackNavigator(
  {
    Login: {
      screen: Login,
    },
    Signup: {
      screen: Signup,
    },
    Loading: {
      screen: Loading,
    },
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
  },
);
