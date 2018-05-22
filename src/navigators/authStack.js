import { createStackNavigator } from 'react-navigation';
import Login from '../containers/Login';
import Signup from '../containers/Signup';

export default createStackNavigator(
  {
    Login: {
      screen: Login,
    },
    Signup: {
      screen: Signup,
    },
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
  },
);
