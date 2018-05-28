import React, { PureComponent } from 'react';
import { View, Text, Image, FlatList, Platform, PermissionsAndroid } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Header } from '../../components';
import { Icons } from '../../themes';
import restaurantData from '../Pin/PinView/data/restaurantData';
import mapStyles from './mapStyles';
import styles from './styles';
import CardView from './CardView';
import { isIphoneX } from '../../utilities/device';
// import * as d from '../../utilities/Tranform';

class MapScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 21.025817,
        longitude: 105.800344,
        latitudeDelta: 0.0301,
        longitudeDelta: 0.0304,
      },
      error: null, // eslint-disable-line
      focusing: false,
      focusingRegion: null,
    };
  }

  componentDidMount() {
    if (Platform.OS === 'ios') {
      this.onGetCurrentLocation();
    } else {
      // TODO: implement message if user is not allow accessing to their location permission
      // & handle error exception
      this._requestAndroidLocationPermission(() => {
        this.onGetCurrentLocation();
      });
    }
    this.watchID = this.onWatchPosition();
  }

  componentWillUnmount() {
    // eslint-disable-next-line
    navigator.geolocation.clearWatch(this.watchID);
  }

  onGetCurrentLocation = () => {
    if (Platform.OS === 'ios') {
      // eslint-disable-next-line no-undef
      navigator.geolocation.requestAuthorization();
    }
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
      { enableHighAccuracy: true, timeout: 3000, maximumAge: 1000 },
    );
  };

  onWatchPosition = () => {
    // eslint-disable-next-line
    navigator.geolocation.watchPosition(
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
      {
        enableHighAccuracy: true,
        timeout: 3000,
        maximumAge: 1000,
        distanceFilter: 100,
      },
    );
  };

  onPickRestaurant = () => {
    this.setState({ focusing: true });
  };

  // eslint-disable-next-line
  async _requestAndroidLocationPermission(allowCallback, deniedCallback, failureCallback) {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          // TODO replace i18n string key instead of hardcode string
          title: 'Yêu cầu',
          message: 'Sử dụng vị trí của bạn để tìm dịch vụ gần nhất.',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        if (allowCallback) {
          allowCallback();
        }
      }
      if (deniedCallback) {
        deniedCallback();
      }
    } catch (err) {
      if (failureCallback) {
        failureCallback(err);
      }
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          leftHeader={<Image source={Icons.menu} />}
          centerHeader={<Text style={styles.centerHeaderStyle}>Map</Text>}
          rightHeader={<Image source={Icons.user} />}
        />
        <MapView
          // initialRegion={this.state.region}
          region={this.state.region}
          onRegionChange={this.onGetCurrentLocation()}
          provider="google"
          customMapStyle={mapStyles}
          style={{ flex: 1 }}
        >
          <Marker coordinate={this.state.region}>
            <Image
              source={Icons.mapPin}
              style={isIphoneX() === true ? styles.mapPinIphoneXStyle : styles.mapPinStyle}
            />
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
                  <Image source={markers.restaurantPhoto} style={styles.focusingPhotoMarkerStyle} />
                </View>
              ) : (
                <View style={styles.markerContainer}>
                  <Image source={Icons.grayMarker} />
                  <Image source={markers.restaurantPhoto} style={styles.defaultPhotoMarkerStyle} />
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
