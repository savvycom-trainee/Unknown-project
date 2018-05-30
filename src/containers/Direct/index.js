import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';

class Direct extends PureComponent {
  state = {};
  render() {
    console.log(this.props.navigation.getParam('user'));
    return (
      <View>
        <Text>Direct</Text>
      </View>
    );
  }
}

export default Direct;
