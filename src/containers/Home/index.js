import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

class Home extends PureComponent {
  state = {};
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.body}>
          <View style={styles.viewMenu}>
            <View style={styles.viewMenuItem}>
              <View style={styles.itemMenu}>
                <Text>jjfjfj</Text>
              </View>
              <View style={styles.itemMenu}>
                <Text>jjfjfj</Text>
              </View>
              <View style={styles.itemMenu}>
                <Text>jjfjfj</Text>
              </View>
            </View>
          </View>
          <View style={styles.viewContent} />
        </View>
      </View>
    );
  }
}

export default Home;
