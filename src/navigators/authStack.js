import { createStackNavigator } from 'react-navigation';
import Login from '../containers/Login';

export default createStackNavigator(
  {
    Login: {
      screen: Login,
    },
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
  },
);
