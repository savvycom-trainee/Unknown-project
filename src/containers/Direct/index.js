import React, { PureComponent } from 'react';
import { View, Text, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { connect } from 'react-redux';
import mapStyles from './mapStyles';
import { Header } from '../../components';
import { Icons } from '../../themes';

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
    };
  }

  componentDidMount() {
    this.onGetCurrentLocation();
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

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          leftHeader={<Image source={Icons.back} />}
          centerHeader={<Text style={{ fontSize: 15, fontWeight: '600' }}>Direct</Text>}
          onPressLeftHeader={() => this.props.navigation.goBack()} // eslint-disable-line
        />
        <MapView region={this.state.region} customMapStyle={mapStyles} style={{ flex: 1 }}>
          <Marker coordinate={this.state.region} />
        </MapView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  region: state.getPositionReducers,
});

export default connect(mapStateToProps)(Direct);
