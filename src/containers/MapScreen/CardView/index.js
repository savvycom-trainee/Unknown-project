import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Card, OpenAndDistance, GreenCircle } from '../../../components';
import { Images } from '../../../themes';
import styles from './styles';

export default class CardView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openingStatus: false,
      distance: 'NaN',
    };
  }

  componentDidMount() {
    this.onCheckOpeningStatus();
    this.onGetDistance();
  }

  onCheckOpeningStatus = () => {
    if (this.props.item.opening_hours === undefined) {
      this.setState({ openingStatus: false });
    } else if (this.props.item.opening_hours.open_now) {
      this.setState({ openingStatus: true });
    }
  };

  onGetDistance = () => {
    fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${this.props.regionLat},${
      this.props.regionLng
    }&destinations=${this.props.latitude},${
      this.props.longitude
    }&key=AIzaSyCthR5BEn21xBOMCGo-qqui8a9jDRNLDOk`)
      .then(res => res.json())
      .then((resJson) => {
        this.setState({ distance: resJson.rows[0].elements[0].distance.text });
      })
      .catch(err => console.log('get distance error ', err));
  };

  render() {
    // console.warn(this.props);
    return (
      <Card direction="row" style={styles.cardStyle} onPress={this.props.onPress}>
        <View style={styles.blankView} />
        <GreenCircle
          onPress={() => {
            this.props.navigation.navigate('HomeDetail', { data: this.props.item.place_id });
          }}
          style={styles.greenCircleStyle}
        >
          {/* <Text style={styles.ratingTextStyle}>{this.props.item.rating}</Text> */}
          <Icon name="ios-document" size={20} color="#FFF" />
        </GreenCircle>
        <View style={styles.container}>
          <View style={styles.restaurantPhotoContainer}>
            <Image
              source={
                this.props.restaurantPhoto !== null
                  ? { uri: this.props.restaurantPhoto }
                  : Images.defaultImage
              }
              style={styles.restaurantPhotoStyle}
            />
          </View>
          <View style={styles.restaurantDetailContainer}>
            <Text style={styles.restaurantNameStyle} numberOfLines={1} ellipsizeMode="tail">
              {this.props.item.name}
            </Text>
            <OpenAndDistance
              openingStatus={this.state.openingStatus}
              distance={this.state.distance}
            />
          </View>
        </View>
      </Card>
    );
  }
}
