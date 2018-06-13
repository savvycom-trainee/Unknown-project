import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import PropTypes from 'prop-types';

import StarRating from 'react-native-star-rating';
import icons from '../../../themes/Icons';
import { Card, OpenAndDistance, GreenCircle } from '../../../components';
import styles from './styles';
import Loading from '../../../components/LoadingContainer';

class PinView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      openingStatus: true,
      type: 'restaurant',
      image:
        'CmRaAAAAtaX7SDQa-6BWxHR1H_Y9yszIOxtdcyMJxg6NLptggntTVTxoiFUahgBnswCO4O8dpACeFXFGamR0QsXVc6iCllGq08YO4rK_bDPiYXy3uZEwGQyTV3LJxmjJbO9vrb9jEhByGXCdMlCu32rAgCtZvS1YGhRe9Ox_fKQnjpG6Vo-UQAjydSGB7A',
    };
  }

  componentDidMount() {
    this.getDataFromApi(this.props.item.key);
  }

  getDataFromApi = (id) => {
    axios
      .get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${id}&key=AIzaSyBftI7qlfXFzlklaejl63pyeO8J9kivXys`)
      .then((response) => {
        console.log(response.data.result);
        // console.log(response.data.result.photos[0].photo_reference);

        this.setState({
          destination: {
            latitude: response.data.result.geometry.location.lat,
            longitude: response.data.result.geometry.location.lng,
          },
          data: response.data.result,
          image: response.data.result.photos[0].photo_reference,
          type: response.data.result.types[0],
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    if (this.props.item.status) {
      if (this.state.data == null) {
        return <Loading />;
      }
      return (
        <Card onPress={this.props.onPress} direction="row" style={styles.cardStyle}>
          <View style={styles.photoViewStyle}>
            <Image
              source={{
                uri: `https://maps.googleapis.com/maps/api/place/photo?photoreference=${
                  this.state.image
                }&sensor=false&maxheight=250&maxwidth=250&key=AIzaSyCthR5BEn21xBOMCGo-qqui8a9jDRNLDOk`,
              }}
              style={{ height: 110, width: 110 }}
            />
          </View>

          <GreenCircle
            onPress={() => this.props.navigate('Direct', { destination: this.state.destination })}
            style={styles.directStyle}
          >
            <Image source={icons.direct} style={styles.directIconStyle} />
          </GreenCircle>

          <View style={styles.detailContainer}>
            <View>
              <Text style={styles.restaurantNameStyle}>{this.state.data.name}</Text>
            </View>
            <View style={styles.bodyDetailStyle}>
              <View>
                <Text style={styles.restaurantTypeStyle}>{this.state.type}</Text>
              </View>
              <StarRating
                disabled={false}
                emptyStar="ios-star-outline"
                fullStar="ios-star"
                iconSet="Ionicons"
                maxStars={5}
                rating={this.state.data.rating}
                fullStarColor="#4CB33E"
                reversed
                starSize={12}
              />
            </View>
            <OpenAndDistance openingStatus={this.state.openingStatus} distance="1km" />
          </View>
        </Card>
      );
    }
    return null;
  }
}
PinView.propTypes = {
  navigate: PropTypes.func.isRequired,
  onPress: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
};

export default PinView;
