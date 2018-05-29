import React, { PureComponent } from 'react';
import { View, Text, Image, FlatList, Platform, PermissionsAndroid } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { Header } from '../../components';
import { Icons, Colors } from '../../themes';
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
      focusing: null,
    };
    this._marker = [];
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
    this.onGetCurrentLocation();
    this.watchID = this.onWatchPosition();
    console.log(`region ${JSON.stringify(this.props.region.coords.longitude)}`);
  }

  componentWillUnmount() {
    // eslint-disable-next-line
    navigator.geolocation.clearWatch(this.watchID);
  }

  onGetCurrentLocation = () => {
    this.setState({
      region: {
        ...this.state.region,
        latitude: this.props.region.coords.latitude,
        longitude: this.props.region.coords.longitude,
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

  onPickRestaurant = () => {
    this.setState({ focusing: true });
  };

  getItemLayout = (data, index) => ({ length: 220, offset: 210 * index, index });

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
            () => (this.state.focusing === null ? {} : this.props.navigation.navigate('Direct')) // eslint-disable-line
          }
        />
        <MapView
          // initialRegion={this.state.region}
          region={this.state.region}
          // onRegionChange={this.onGetCurrentLocation()}
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
              // eslint-disable-next-line
              ref={marker => (this._marker[index] = { marker, id: markers.restaurantName })}
              coordinate={markers.region}
              onPress={() => {
                this.setState({
                  focusing: this._marker[index].id,
                });
                console.log(index);
                this.scrollToIndex(index);
              }}
            >
              <View style={styles.markerContainer}>
                <Image
                  source={
                    this.state.focusing === markers.restaurantName
                      ? Icons.greenMarker
                      : Icons.grayMarker
                  }
                />
                <Image
                  source={markers.restaurantPhoto}
                  style={
                    this.state.focusing === markers.restaurantName
                      ? styles.focusingPhotoMarkerStyle
                      : styles.defaultPhotoMarkerStyle
                  }
                />
              </View>
            </Marker>
          ))}
        </MapView>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={restaurantData}
          // eslint-disable-next-line
          ref={ref => (this._flatListMarker = ref)}
          getItemLayout={this.getItemLayout}
          renderItem={({ item, index }) => (
            <CardView
              item={item}
              onPress={() => {
                this.setState({ focusing: this._marker[index].id });
                this.scrollToIndex(index);
              }}
            />
          )}
          keyExtractor={item => item.restaurantName}
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
