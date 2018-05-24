import React, { PureComponent } from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import MapView from 'react-native-maps';
import { Header } from '../../components';
import { Icons } from '../../themes';
import restaurantData from '../Pin/PinView/data/restaurantData';
import mapStyles from './mapStyles';
import styles from './styles';
import CardView from './CardView';
// import * as d from '../../utilities/Tranform';

class MapScreen extends PureComponent {
  state = {};
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          leftHeader={<Image source={Icons.menu} />}
          centerHeader={<Text style={styles.centerHeaderStyle}>Map</Text>}
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
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={restaurantData}
          renderItem={({ item }) => <CardView item={item} />}
          keyExtractor={item => item.restaurantName}
          style={styles.flatListStyle}
        />
      </View>
    );
  }
}

export default MapScreen;
