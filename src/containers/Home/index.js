import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import MapView from 'react-native-maps';

class Home extends PureComponent {
  state = {};
  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      </View>
    );
  }
}

export default Home;
