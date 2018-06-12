import { createStackNavigator } from 'react-navigation';
import TabHome from './tabHome';
import Direct from '../containers/Direct';
import HomeDetail from '../containers/HomeDetail';

export default createStackNavigator(
  {
    TabHome: {
      screen: TabHome,
    },
    HomeDetail: {
      screen: HomeDetail,
    },
    Direct: {
      screen: Direct,
    },
  },
  {
    initialRouteName: 'TabHome',
    headerMode: 'none',
  },
);
