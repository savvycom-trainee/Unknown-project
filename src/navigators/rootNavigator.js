import { createSwitchNavigator } from 'react-navigation';
import MainStack from './mainStack';
import Auth from './authStack';
import { UpdateUser } from '../components';

export default createSwitchNavigator(
  {
    MainStack: {
      screen: MainStack,
    },
    Auth: {
      screen: Auth,
    },
    UpdateUser: {
      screen: UpdateUser,
    },
  },
  {
    // TODO change Home to Auth when has asyncStorage
    initialRouteName: 'Auth',
    mode: 'card',
    tabBarVisible: false,
    headerMode: 'none',
  },
);
