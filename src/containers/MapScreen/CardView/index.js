import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import { Card, OpenAndDistance, GreenCircle } from '../../../components';
import styles from './styles';

export default class CardView extends Component {
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

  onCheckOpeningStatus() {
    if (
      this.state.momentTime < this.props.item.openTime ||
      this.state.momentTime > this.props.item.closedTime
    ) {
      this.setState({ openingStatus: false });
    } else {
      this.setState({ openingStatus: true });
    }
  }

  render() {
    return (
      <Card direction="row" style={styles.cardStyle} onPress={this.props.onPress}>
        <View style={styles.blankView} />
        <GreenCircle onPress={() => {}} style={styles.greenCircleStyle}>
          <Text style={styles.ratingTextStyle}>{this.props.item.rating}</Text>
        </GreenCircle>
        <View style={styles.container}>
          <View style={styles.restaurantPhotoContainer}>
            <Image source={this.props.item.restaurantPhoto} style={styles.restaurantPhotoStyle} />
          </View>
          <View style={styles.restaurantDetailContainer}>
            <Text style={styles.restaurantNameStyle}>{this.props.item.restaurantName}</Text>
            <OpenAndDistance
              openingStatus={this.state.openingStatus}
              distance={this.props.item.distance}
            />
          </View>
        </View>
      </Card>
    );
  }
}
