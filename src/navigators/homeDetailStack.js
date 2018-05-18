import { createBottomTabNavigator } from 'react-navigation';
import DetailRestaurant from '../containers/Home/DetailRestaurant';
import MenuRestaurant from '../containers/Home/MenuRestaurant';
import ReviewRestaurant from '../containers/Home/ReviewRestaurant';

import Colors from '../themes/Colors';

export default createBottomTabNavigator(
  {
    Overview: DetailRestaurant,
    Menu: MenuRestaurant,
    Review: ReviewRestaurant,
  },
  {
    tabBarOptions: {
      activeTintColor: Colors.default,
      showLabel: true,
      lableStyle: {
        // alignItems: 'center',
        // justifyContent: 'center',
        // color: 'red',
        fontSize: 200,
      },
      style: {
        // alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: '#fff',
      },
    },
  },
);
