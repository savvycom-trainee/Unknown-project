import { createStackNavigator } from 'react-navigation';
import Login from '../containers/Login';
import Signup from '../containers/Signup';
import Loading from '../containers/Loading';
import Test from '../components/CheckBox';

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
    Test: {
      screen: Test,
    },
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
  },
);
