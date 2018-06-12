import React, { PureComponent } from 'react';
import { View, Text, Image, Animated, Modal } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { connect } from 'react-redux';
import Polyline from '@mapbox/polyline';
import mapStyles from './mapStyles';
import styles from './styles';
import { fetchDataGetAdd } from '../../actions';
import { Header, Card } from '../../components';
import { Icons, Images } from '../../themes';
import * as d from '../../utilities/Tranform';

const PADDING = {
  top: 50 * d.ratioH,
  right: 50 * d.ratioW,
  bottom: 50 * d.ratioH,
  left: 50 * d.ratioW,
};

class Direct extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 21.025817,
        longitude: 105.800344,
        latitudeDelta: 0.0021,
        longitudeDelta: 0.0024,
      },
      err: null, // eslint-disable-line
      animatedLargeMarker: new Animated.Value(0),
      animatedMediumMarker: new Animated.Value(0),
      animatedSmallMarker: new Animated.Value(0),
      animatedLargeMarkerFade: new Animated.Value(1),
      animatedMediumMarkerFade: new Animated.Value(1),
      animatedSmallMarkerFade: new Animated.Value(1),
      direction: [],
      distance: null,
      travelTime: null,
      modalVisible: false,
    };
    this.destination = this.props.navigation.getParam('destination', 'null'); // eslint-disable-line
    this.markers = [
      {
        latitude: this.props.region.coords.latitude, // eslint-disable-line
        longitude: this.props.region.coords.longitude, // eslint-disable-line
      },
      {
        latitude: this.destination.latitude,
        longitude: this.destination.longitude,
      },
    ];
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
    // eslint-disable-next-line
    fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${
      this.props.region.coords.latitude
    },${this.props.region.coords.longitude}&destination=${this.destination.latitude},${
      this.destination.longitude
    }&key=AIzaSyCthR5BEn21xBOMCGo-qqui8a9jDRNLDOk`)
      .then(res => res.json())
      .then((resJson) => {
        // this.setState({ directionAPI: resJson });
        console.log(resJson);
        this.onGetDirection(resJson);
      })
      .catch(err => console.log(`Get API direction error: ${err}`));
  };

  onGetDirection = (resJson) => {
    const points = Polyline.decode(resJson.routes[0].overview_polyline.points);
    const coords = points.map(point => ({
      latitude: point[0],
      longitude: point[1],
    }));

    this.setState({
      direction: coords,
      travelTime: resJson.routes[0].legs[0].duration.text,
      distance: resJson.routes[0].legs[0].distance.text,
    });

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
          ref={(ref) => this.map = ref} // eslint-disable-line
          onLayout={() => setTimeout(() => this.map.fitToCoordinates(this.markers, {
            edgePadding: PADDING,
            animated: true,
          }), 1000)}
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
            coordinates={this.state.direction}
            strokeColor="rgb(66, 183, 42)"
            strokeWidth={3}
          />
        </MapView>
        <Card style={styles.cardStyle} direction="row">
          <View style={styles.firstViewStyle}>
            <Image source={Icons.direct} style={styles.directStyle} />
          </View>
          <View style={styles.secondViewStyle}>
            <View style={styles.detailStyle}>
              <Text style={styles.travelTimeStyle}>{this.state.travelTime}</Text>
              <Text style={styles.distanceStyle}>({this.state.distance})</Text>
            </View>
            <Text style={styles.textStyle}>Fastest route</Text>
          </View>
        </Card>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  region: state.getPositionReducers,
  dataRestaurantAround: state.getAddReducers,
});

export default connect(mapStateToProps, { fetchDataGetAdd })(Direct);
