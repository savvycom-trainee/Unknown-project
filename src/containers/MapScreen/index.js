import React, { PureComponent } from 'react';
import { View, Text, Image } from 'react-native';
import MapView from 'react-native-maps';
import { Header } from '../../components';
import { Icons } from '../../themes';
import * as d from '../../utilities/Tranform';
import mapStyles from './mapStyles';

class MapScreen extends PureComponent {
  state = {};
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          leftHeader={<Image source={Icons.menu} style={{ marginTop: 2 * d.ratioH }} />}
          centerHeader={<Text style={{ fontSize: 15, fontWeight: '600' }}>Map</Text>}
          rightHeader={<Image source={Icons.user} />}
        />
        <MapView
          region={{
            latitude: 21.030244,
            longitude: 105.784782,
            latitudeDelta: 0.0301,
            longitudeDelta: 0.0304,
          }}
          provider="google"
          customMapStyle={mapStyles}
          style={{ flex: 1 }}
        />
      </View>
    );
  }
}

export default MapScreen;
