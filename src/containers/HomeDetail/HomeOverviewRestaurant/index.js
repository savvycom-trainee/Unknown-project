import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

class HomeOverviewRestaurant extends PureComponent {
  static navigationOptions = {
    tabBarVisible: false,
  };
  state = {};
  render() {
    return (
      <View style={styles.ViewMain}>
        <Text>DetailRestaurant</Text>
      </View>
    );
  }
}

export default HomeOverviewRestaurant;
