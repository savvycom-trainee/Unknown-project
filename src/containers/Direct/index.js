import React, { PureComponent } from 'react';
import { View, Text, Image, Animated, Easing } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { connect } from 'react-redux';
import Polyline from '@mapbox/polyline';
import mapStyles from './mapStyles';
import styles from './styles';
import { Header } from '../../components';
import { Icons, Images } from '../../themes';

const COORDINATES = [
  { latitude: 21.030675, longitude: 105.784853 },
  { latitude: 21.0303099, longitude: 105.7879763 },
  { latitude: 21.0295683, longitude: 105.7918811 },
  { latitude: 21.0297938, longitude: 105.7919458 },
  { latitude: 21.029785, longitude: 105.791981 },
];

class Direct extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 21.025817,
        longitude: 105.800344,
        latitudeDelta: 0.0201,
        longitudeDelta: 0.0204,
      },
      err: null,
      animatedLargeMarker: new Animated.Value(0),
      animatedMediumMarker: new Animated.Value(0),
      animatedSmallMarker: new Animated.Value(0),
      animatedLargeMarkerFade: new Animated.Value(1),
      animatedMediumMarkerFade: new Animated.Value(1),
      animatedSmallMarkerFade: new Animated.Value(1),
      directionAPI: null,
      direction: []
    };
    this.destination = this.props.navigation.getParam('destination', 'null');
  }

  componentDidMount() {
    this.onGetDirectionAPI();
    this.onGetCurrentLocation();
    this.animationMarker();
  }

  componentWillUnmount() {
    // eslint-disable-next-line
    navigator.geolocation.clearWatch(this.watchID);
  }

  onGetDirectionAPI = () => {
    fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${
      this.props.region.coords.latitude
    },${this.props.region.coords.longitude}&destination=${this.destination.latitude},${
      this.destination.longitude
    }&key=AIzaSyAW5rqaM6BzeUu5ww0xEXBWhPNv9p5sdIE`)
      .then(res => res.json())
      .then((resJson) => {
        // this.setState({ directionAPI: resJson });
        console.log(resJson);
        this.onGetDirection(resJson);
      })
      .catch(err => console.log(`Get API error: ${err}`));
  };

  onGetDirection = (resJson) => {
    const points = Polyline.decode(resJson.routes[0].overview_polyline.points);
    const coords = points.map(point => ({
      latitude: point[0],
      longitude: point[1],
    }));
    this.setState({ coords });

    console.log(this.direction);
  };

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

  animationMarker = () => {
    Animated.parallel([
      Animated.timing(this.state.animatedSmallMarkerFade, {
        toValue: 1,
        duration: 0,
      }),
      Animated.timing(this.state.animatedMediumMarkerFade, {
        toValue: 1,
        duration: 0,
      }),
      Animated.timing(this.state.animatedLargeMarkerFade, {
        toValue: 1,
        duration: 0,
      }),
      Animated.timing(this.state.animatedSmallMarker, {
        toValue: 0,
        duration: 0,
      }),
      Animated.timing(this.state.animatedMediumMarker, {
        toValue: 0,
        duration: 0,
      }),
      Animated.timing(this.state.animatedLargeMarker, {
        toValue: 0,
        duration: 0,
      }),
      Animated.timing(this.state.animatedSmallMarker, {
        toValue: 1,
        duration: 600,
      }),
      Animated.timing(this.state.animatedMediumMarker, {
        toValue: 1,
        duration: 900,
      }),
      Animated.timing(this.state.animatedLargeMarker, {
        toValue: 1,
        duration: 1200,
      }),
      Animated.timing(this.state.animatedSmallMarkerFade, {
        toValue: 0,
        duration: 400,
        delay: 1200,
      }),
      Animated.timing(this.state.animatedMediumMarkerFade, {
        toValue: 0,
        duration: 400,
        delay: 1200,
      }),
      Animated.timing(this.state.animatedLargeMarkerFade, {
        toValue: 0,
        duration: 400,
        delay: 1200,
      }),
    ]).start(() => this.animationMarker());
  };

  render() {
    console.log(this.props.navigation.getParam('user'));
    return (
      <View style={{ flex: 1 }}>
        <Header
          leftHeader={<Image source={Icons.back} />}
          centerHeader={<Text style={{ fontSize: 15, fontWeight: '600' }}>Direct</Text>}
          onPressLeftHeader={() => this.props.navigation.goBack()} // eslint-disable-line
        />
        <MapView
          region={this.state.region}
          provider="google"
          customMapStyle={mapStyles}
          style={{ flex: 1 }}
        >
          <Marker coordinate={this.state.region} anchor={{ x: 0.5, y: 0.5 }}>
            <View style={styles.smallMarkerLocation}>
              <View style={styles.smallCenterMarker} />
            </View>
          </Marker>
          <Marker coordinate={this.state.region} anchor={{ x: 0.5, y: 0.5 }}>
            <View style={styles.userMarker}>
              <Animated.View
                style={[
                  styles.circleMarkerStyle,
                  styles.largeMarker,
                  {
                    transform: [{ scale: this.state.animatedLargeMarker }],
                    opacity: this.state.animatedLargeMarkerFade,
                  },
                ]}
              />
              <Animated.View
                style={[
                  styles.circleMarkerStyle,
                  styles.mediumMarker,
                  {
                    transform: [{ scale: this.state.animatedMediumMarker }],
                    opacity: this.state.animatedMediumMarkerFade,
                  },
                ]}
              />
              <Animated.View
                style={[
                  styles.circleMarkerStyle,
                  styles.smallMarker,
                  {
                    transform: [{ scale: this.state.animatedSmallMarker }],
                    opacity: this.state.animatedSmallMarkerFade,
                  },
                ]}
              />
              <Image source={Images.avatar} style={styles.userImageMarker} />
            </View>
          </Marker>
          <Marker coordinate={this.destination} anchor={{ x: 0.5, y: 0.5 }}>
            <View style={styles.smallMarkerLocation}>
              <View style={styles.smallCenterMarker} />
            </View>
          </Marker>
          <MapView.Polyline
            coordinates={this.state.coords}
            strokeColor="rgb(66, 183, 42)"
            strokeWidth={3}
          />
        </MapView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  region: state.getPositionReducers,
});

export default connect(mapStateToProps)(Direct);
