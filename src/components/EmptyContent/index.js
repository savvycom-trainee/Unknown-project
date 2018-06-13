import React, { Component } from 'react';
import { ActivityIndicator, Text, View, StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContent: {
    height: 250,
    width: 250,
  },
});

class EmptyContent extends Component {
  state = { animating: true };
  render() {
    // const animating = this.state.animating;
    return (
      <View style={styles.container}>
        <Image source={require('./EmptyContent.jpg')} style={styles.imageContent} />
      </View>
    );
  }
}
export default EmptyContent;
