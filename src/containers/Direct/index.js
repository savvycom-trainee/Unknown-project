import React, { PureComponent } from 'react';
import { View, Text, Image, Animated, Easing } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { connect } from 'react-redux';
import mapStyles from './mapStyles';
import styles from './styles';
import { Header } from '../../components';
import { Icons, Images } from '../../themes';

class Direct extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 21.025817,
        longitude: 105.800344,
        latitudeDelta: 0.0301,
        longitudeDelta: 0.0304,
      },
      err: null,
      animatedLargeMarker: new Animated.Value(0),
      animatedMediumMarker: new Animated.Value(0),
      animatedSmallMarker: new Animated.Value(0),
      animatedLargeMarkerFade: new Animated.Value(1),
      animatedMediumMarkerFade: new Animated.Value(1),
      animatedSmallMarkerFade: new Animated.Value(1),
      destinationAPI: null,
    };
    this.destination = this.props.navigation.getParam('destination', 'null');
  }

  componentDidMount() {
    this.onGetDirection();
    this.onGetCurrentLocation();
    this.animationMarker();
    // console.log('destinationAPI ' + this.state.destinationAPI);
  }

  componentWillUnmount() {
    // eslint-disable-next-line
    navigator.geolocation.clearWatch(this.watchID);
  }

  onGetDirection = () => {
    fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${this.props.region.coords.latitude},${this.props.region.coords.longitude}&destinations=${this.destination.latitude},${this.destination.longitude}&key=AIzaSyDnva88GSkmlgjQLiLESaJ7qIIxKL_Wu6U`)
      .then((res) => res.json())
      .then((resJson) => {this.setState({destinationAPI: resJson}), console.log(resJson)})
      .catch(err => console.log('Get API error: ' + err))
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
            <View
              style={{
                height: 120,
                width: 120,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Animated.View
                style={[
                  styles.circleMarkerStyle,
                  { height: 100, width: 100, borderRadius: 50 },
                  {
                    transform: [{ scale: this.state.animatedLargeMarker }],
                    opacity: this.state.animatedLargeMarkerFade,
                  },
                ]}
              />
              <Animated.View
                style={[
                  styles.circleMarkerStyle,
                  { height: 75, width: 75, borderRadius: 37.5 },
                  {
                    transform: [{ scale: this.state.animatedMediumMarker }],
                    opacity: this.state.animatedMediumMarkerFade,
                  },
                ]}
              />
              <Animated.View
                style={[
                  styles.circleMarkerStyle,
                  { height: 50, width: 50, borderRadius: 25 },
                  {
                    transform: [{ scale: this.state.animatedSmallMarker }],
                    opacity: this.state.animatedSmallMarkerFade,
                  },
                ]}
              />
              <Image source={Images.avatar} style={{ height: 25, width: 25, borderRadius: 12.5 }} />
            </View>
          </Marker>
        </MapView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  region: state.getPositionReducers,
});

export default connect(mapStateToProps)(Direct);
