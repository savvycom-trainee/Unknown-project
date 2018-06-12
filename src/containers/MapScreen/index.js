import React, { PureComponent } from 'react';
import { View, Text, Image, FlatList, Platform, PermissionsAndroid } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { Header } from '../../components';
import { Icons, Colors, Images } from '../../themes';
import mapStyles from './mapStyles';
import styles from './styles';
import CardView from './CardView';
import { isIphoneX } from '../../utilities/device';
import * as d from '../../utilities/Tranform';

const PADDING = {
  top: 80 * d.ratioH,
  right: 80 * d.ratioW,
  bottom: 80 * d.ratioH,
  left: 80 * d.ratioW,
};

class MapScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 21.025817,
        longitude: 105.800344,
        latitudeDelta: 0.0101,
        longitudeDelta: 0.0104,
      },
      error: null, // eslint-disable-line
      focusing: null,
      destination: null,
      dataRestaurantAround: null,
    };
    this._marker = [];
    this.markers = [];
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
    // this.onGetCurrentLocation();
    this.watchID = this.onWatchPosition();
    this.onGetRestaurantAround();
  }

  componentWillUnmount() {
    // eslint-disable-next-line
    navigator.geolocation.clearWatch(this.watchID);
  }

  onGetCurrentLocation = () => {
    this.setState({
      region: {
        ...this.state.region,
      },
    });
  };

  onWatchPosition = () => {
    // eslint-disable-next-line
    navigator.geolocation.watchPosition(
      (position) => {
        this.setState({
          region: {
            ...this.state.region,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
          error: null, // eslint-disable-line
        });
      },
      (error) => {
        this.setState({ error }); // eslint-disable-line
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 10,
      },
    );
  };

  onGetRestaurantAround = () => {
    // eslint-disable-next-line
    fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyCthR5BEn21xBOMCGo-qqui8a9jDRNLDOk&location=${
        this.props.region.coords.latitude
      },${this.props.region.coords.longitude}&radius=1000&type=restaurant`)
      .then(res => res.json())
      .then((resJson) => {
        this.setState({ dataRestaurantAround: resJson.results });
        resJson.results.forEach((markerRegion) => {
          this.markers.push({
            latitude: markerRegion.geometry.location.lat,
            longitude: markerRegion.geometry.location.lng,
          });
        });
      })
      .catch(err => console.log(`Get restaurant around error: ${err}`));
  };

  onGetRestaurantPhoto = ref =>
    `https://maps.googleapis.com/maps/api/place/photo?photoreference=${ref}&sensor=false&maxheight=200&maxwidth=200&key=AIzaSyCthR5BEn21xBOMCGo-qqui8a9jDRNLDOk`;

  getItemLayout = (data, index) => ({ length: 220, offset: isIphoneX ? 219 * index : 210 * index, index });

  scrollToIndex = (index) => {
    this._flatListMarker.scrollToIndex({ animated: true, index, viewOffset: 1 });
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
          rightHeader={
            <Icon
              name="md-navigate"
              color={this.state.focusing === null ? '#AAAAAA' : Colors.default}
              size={33}
              style={styles.directIconStyle}
            />
          }
          onPressRightHeader={
            () =>
              (this.state.focusing === null
                ? {}
                : this.props.navigation.navigate('Direct', { destination: this.state.destination })) // eslint-disable-line
          }
        />
        <MapView
          region={this.state.region}
          ref={ref => { this.map = ref }} // eslint-disable-line
          // onLayout={() => setTimeout(() => this.map.fitToCoordinates(this.markers, {
          //   edgePadding: PADDING,
          //   animated: true,
          // }), 1500)}
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
          {this.state.dataRestaurantAround !== null
            ? this.state.dataRestaurantAround.map((markers, index) => (
              <Marker
                key={markers.id}
                // eslint-disable-next-line
                ref={marker => (this._marker[index] = { marker, id: markers.id })}
                coordinate={{
                  latitude: markers.geometry.location.lat,
                  longitude: markers.geometry.location.lng,
                }}
                onPress={() => {
                  this.setState({
                    focusing: this._marker[index].id,
                    destination: this._marker[index].marker.props.coordinate,
                  });
                  this.scrollToIndex(index);
                }}
              >
                <View style={styles.markerContainer}>
                  <Image
                    source={this.state.focusing === markers.id
                              ? Icons.greenMarker : Icons.grayMarker}
                  />
                  <Image
                    source={markers.photos !== undefined
                            ? { uri: this.onGetRestaurantPhoto(markers.photos[0].photo_reference) }
                            : Images.defaultImage}
                    style={
                      this.state.focusing === markers.id
                        ? styles.focusingPhotoMarkerStyle
                        : styles.defaultPhotoMarkerStyle
                    }
                  />
                </View>
              </Marker>
          )) : null}
        </MapView>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={this.state.dataRestaurantAround}
          // eslint-disable-next-line
          ref={ref => (this._flatListMarker = ref)}
          getItemLayout={this.getItemLayout}
          renderItem={({ item, index }) => (
            <CardView
              restaurantPhoto={item.photos !== undefined
                                ? this.onGetRestaurantPhoto(item.photos[0].photo_reference)
                                : null
                              }
              navigation={this.props.navigation}
              regionLat={this.props.region.coords.latitude}
              regionLng={this.props.region.coords.longitude}
              latitude={item.geometry.location.lat}
              longitude={item.geometry.location.lng}
              item={item}
              onPress={() => {
                this.setState({
                  focusing: this._marker[index].id,
                  destination: this._marker[index].marker.props.coordinate,
                });
                this.scrollToIndex(index);
              }}
            />
          )}
          keyExtractor={item => item.id}
          style={styles.flatListStyle}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  region: state.getPositionReducers,
});

export default connect(mapStateToProps)(MapScreen);
