import { createStackNavigator } from 'react-navigation';
import TabHome from './tabHome';
import Direct from '../containers/Direct';

export default createStackNavigator(
  {
    TabHome: {
      screen: TabHome,
    },
    Direct: {
      screen: Direct,
    },
  },
  {
    // initialRouteName: 'Home',
    headerMode: 'none',
  },
);
