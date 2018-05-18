import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import styles from './DetailRestaurantStyle';

class DetailRestaurant extends PureComponent {
  state = {};
  static navigationOptions = {
    tabBarVisible: false,
  };
  render() {
    return (
      <View style={styles.ViewMain}>
        <Text>DetailRestaurant</Text>
      </View>
    );
  }
}

export default DetailRestaurant;
