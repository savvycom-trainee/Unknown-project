import React from 'react';
// import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import { createBottomTabNavigator, TabNavigator } from 'react-navigation';
import { Icons } from '../themes';
import styles from './styles';
import HomeStack from './homeStack';
import SearchStack from './searchStack';
import MapStack from './mapStack';
import NotificationsStack from './notificationsStack';
import PinStack from './pinStack';

export default createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: ({ navigation }) => ({ tabBarVisible: navigation.state.index === 0 }),
    },
    Search: SearchStack,
    Pointer: MapStack,
    Notifications: NotificationsStack,
    Pin: PinStack,
  },
  {
    navigationOptions: ({ navigation }) => ({
      // eslint-disable-next-line
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconImage;
        let iconBG;
        if (routeName === 'Home') {
          iconImage = focused ? Icons.homeFocused : Icons.home;
        }
        if (routeName === 'Search') {
          iconImage = focused ? Icons.searchFocused : Icons.search;
        }
        if (routeName === 'Pin') {
          iconImage = focused ? Icons.pinFocused : Icons.pin;
        }
        if (routeName === 'Notifications') {
          iconImage = focused ? Icons.notificationFocused : Icons.notification;
        } else if (routeName === 'Pointer') {
          iconBG = (
            <View style={styles.viewPointBG}>
              <View style={styles.viewPointBGsmall}>
                <Image source={Icons.pointer} />
              </View>
            </View>
          );
        }
        return (
          <View style={styles.viewBGTabar}>
            {iconBG || null}
            <Image source={iconImage} style={{ height: 23, width: 21.5 }} />
          </View>
        );
      },
    }),
    initialRouteName: 'Home',
    tabBarOptions: {
      ...TabNavigator.Presets.iOSBottomTabs,
      showLabel: false,
      style: {
        backgroundColor: '#fff',
      },
    },
  },
);
