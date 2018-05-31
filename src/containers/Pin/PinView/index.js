import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import StarRating from 'react-native-star-rating';
import icons from '../../../themes/Icons';
import { Card, OpenAndDistance, GreenCircle } from '../../../components';
import styles from './styles';

export default class PinView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openingStatus: false,
      momentTime: 15,
    };
  }

  componentDidMount() {
    this.onCheckOpeningStatus();
  }

  onCheckOpeningStatus = () => {
    if (
      this.state.momentTime < this.props.item.openTime ||
      this.state.momentTime > this.props.item.closedTime
    ) {
      this.setState({ openingStatus: false });
    } else {
      this.setState({ openingStatus: true });
    }
    console.log(this.props.item);
  };

  render() {
    return (
      <Card onPress={this.props.onPress} direction="row" style={styles.cardStyle}>
        {/* <View style={styles.photoContainerStyle}> */}
        <View style={styles.photoViewStyle}>
          <Image source={this.props.item.restaurantPhoto} />
        </View>
        {/* </View> */}
        <GreenCircle onPress={this.props.onDirectPress} style={styles.directStyle}>
          <Image source={icons.direct} style={styles.directIconStyle} />
        </GreenCircle>
        <View style={styles.detailContainer}>
          <View>
            <Text style={styles.restaurantNameStyle}>{this.props.item.restaurantName}</Text>
          </View>
          <View style={styles.bodyDetailStyle}>
            <View>
              <Text style={styles.restaurantTypeStyle}>{this.props.item.type}</Text>
            </View>
            <StarRating
              disabled={false}
              emptyStar="ios-star-outline"
              fullStar="ios-star"
              iconSet="Ionicons"
              maxStars={4}
              rating={this.props.item.starCount}
              fullStarColor="#4CB33E"
              reversed
              starSize={12}
            />
          </View>
          <OpenAndDistance
            openingStatus={this.state.openingStatus}
            distance={this.props.item.distance}
          />
        </View>
      </Card>
    );
  }
}
