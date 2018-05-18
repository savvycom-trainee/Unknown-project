import React from 'react';
// import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import { Images } from '../themes';
import styles from './styles';
import HomeStack from './homeStack';
import SearchStack from './searchStack';
import MapStack from './mapStack';
import NotificationsStack from './notificationsStack';
import PinStack from './pinStack';

export default createBottomTabNavigator(
  {
    Home: HomeStack,
    Search: SearchStack,
    Pointer: MapStack,
    Notifications: NotificationsStack,
    Pin: PinStack,
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconImage;
        let iconBG;
        if (routeName === 'Home') {
          iconImage = focused ? Images.homeed : Images.home;
        }
        if (routeName === 'Search') {
          iconImage = focused ? Images.searched : Images.search;
        }
        if (routeName === 'Pin') {
          iconImage = focused ? Images.pined : Images.pin;
        }
        if (routeName === 'Notifications') {
          iconImage = focused ? Images.notificationed : Images.notification;
        } else if (routeName === 'Pointer') {
          iconBG = (
            <View style={styles.viewPointBG}>
              <View style={styles.viewPointBGsmall}>
                <Image source={Images.pointer} />
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
    tabBarOptions: {
      showLabel: false,
      style: {
        backgroundColor: '#fff',
      },
    },
  },
);
