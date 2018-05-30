import { createSwitchNavigator } from 'react-navigation';
import MainStack from './mainStack';
import Auth from './authStack';

export default createSwitchNavigator(
  {
    MainStack: {
      screen: MainStack,
    },
    Auth: {
      screen: Auth,
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
