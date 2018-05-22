import React, { PureComponent } from 'react';
import { View, Text, Image } from 'react-native';

import styles from './styles';

class Content extends PureComponent {
  state = {};
  render() {
    return (
      <View style={styles.ViewMain}>
        <Text>Content</Text>
      </View>
    );
  }
}

export default Content;
