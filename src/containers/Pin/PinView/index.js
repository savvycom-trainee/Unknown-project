import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import StarRating from 'react-native-star-rating';
import { Card } from '../../../components';
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
      <Card>
        <Image source={this.props.item.restaurantPhoto} />
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
          <View style={styles.footerDetailStyle}>
            <Text
              style={{
                color: this.state.openingStatus ? '#4CB33E' : '#F9593A',
                fontSize: 11,
              }}
            >
              {this.state.openingStatus ? 'Open Now' : 'Closed'}
            </Text>
            <Text style={styles.lightSmallTextStyle}>•</Text>
            <Text style={styles.lightSmallTextStyle}>{this.props.item.distance} from you</Text>
          </View>
        </View>
      </Card>
    );
  }
}
