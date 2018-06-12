import React, { Component } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

class Loading extends Component {
  state = { animating: true };
  render() {
    const animating = this.state.animating;
    return (
      <View style={styles.container}>
        <ActivityIndicator
          animating={animating}
          color="#000"
          size="large"
          style={styles.activityIndicator}
        />
      </View>
    );
  }
}
export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
  },
});
