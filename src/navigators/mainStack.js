import { createStackNavigator } from 'react-navigation';
import TabHome from './tabHome';
import Direct from '../containers/Direct';
import HomeDetail from '../containers/HomeDetail';
import { UpdateUser } from '../components';

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
    UpdateUser: {
      screen: UpdateUser,
    },
  },
  {
    initialRouteName: 'TabHome',
    headerMode: 'none',
  },
);
