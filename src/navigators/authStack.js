import { createStackNavigator } from 'react-navigation';
import Login from '../containers/Login';
import Signup from '../containers/Signup';
import Loading from '../containers/Loading';
import { UpdateUser } from '../components';

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
    UpdateUser: {
      screen: UpdateUser,
    },
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
  },
);
