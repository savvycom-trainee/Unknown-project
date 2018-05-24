import React, { PureComponent } from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Header } from '../../components';
import { Icons } from '../../themes';
import restaurantData from '../Pin/PinView/data/restaurantData';
import mapStyles from './mapStyles';
import styles from './styles';
import CardView from './CardView';
// import * as d from '../../utilities/Tranform';

class MapScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 25.030244,
        longitude: 110.784782,
        latitudeDelta: 0.0301,
        longitudeDelta: 0.0304,
      },
      error: null, // eslint-disable-line
      focusing: false,
      focusingRegion: null,
    };
  }

  componentDidMount() {
    this.onGetCurrentLocation();
  }

  onGetCurrentLocation = () => {
    // eslint-disable-next-line
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: this.state.region.latitudeDelta,
            longitudeDelta: this.state.region.longitudeDelta,
          },
          error: null, // eslint-disable-line
        });
      },
      (error) => {
        this.setState({ error }); // eslint-disable-line
        console.log(error);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 100000 },
    );
  };

  onPickRestaurant = () => {
    this.setState({ focusing: true });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          leftHeader={<Image source={Icons.menu} />}
          centerHeader={<Text style={styles.centerHeaderStyle}>Map</Text>}
          rightHeader={<Image source={Icons.user} />}
        />
        <MapView
          initialRegion={this.state.region}
          provider="google"
          customMapStyle={mapStyles}
          style={{ flex: 1 }}
        >
          <Marker coordinate={this.state.region}>
            <Image source={Icons.mapPin} style={styles.mapPinStyle} />
          </Marker>
          {restaurantData.map((markers, index) => (
            <Marker
              key={markers.restaurantName}
              coordinate={markers.region}
              onPress={(e) => {
                this.setState({
                  focusing: true,
                  focusingRegion: JSON.stringify(e.nativeEvent.coordinate),
                });
              }}
            >
              {this.state.focusing &&
              this.state.focusingRegion === JSON.stringify(markers.region) ? (
                <View style={styles.markerContainer}>
                  <Image source={Icons.greenMarker} />
                  <Image
                    source={markers.restaurantPhoto}
                    style={styles.focusingPhotoMarkerStyle}
                  />
                </View>
              ) : (
                <View style={styles.markerContainer}>
                  <Image source={Icons.grayMarker} />
                  <Image
                    source={markers.restaurantPhoto}
                    style={styles.defaultPhotoMarkerStyle}
                  />
                </View>
              )}
            </Marker>
          ))}
        </MapView>
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
