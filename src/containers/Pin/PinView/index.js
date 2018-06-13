import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import StarRating from 'react-native-star-rating';
import icons from '../../../themes/Icons';
import { Card, OpenAndDistance, GreenCircle } from '../../../components';
import styles from './styles';

class PinView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      openingStatus: true,
      type: 'restaurant',
      image:
        'CmRaAAAAtaX7SDQa-6BWxHR1H_Y9yszIOxtdcyMJxg6NLptggntTVTxoiFUahgBnswCO4O8dpACeFXFGamR0QsXVc6iCllGq08YO4rK_bDPiYXy3uZEwGQyTV3LJxmjJbO9vrb9jEhByGXCdMlCu32rAgCtZvS1YGhRe9Ox_fKQnjpG6Vo-UQAjydSGB7A',
    };
  }

  componentDidMount() {
    // console.log(this.props);
    this.getDataFromApi(this.props.item.key);
  }
  // https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJtyxMhkurNTERwzERCRw92us&key=AIzaSyBftI7qlfXFzlklaejl63pyeO8J9kivXys

  getDataFromApi = (id) => {
    axios
      .get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${id}&key=AIzaSyBftI7qlfXFzlklaejl63pyeO8J9kivXys`)
      .then((response) => {
        console.log(response.data.result);
        console.log(response.data.result.photos[0].photo_reference);

        this.setState({
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
      return (
        <Card onPress={this.props.onPress} direction="row" style={styles.cardStyle}>
          {/* <View style={styles.photoContainerStyle}> */}
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
          {/* </View> */}
          <GreenCircle onPress={this.props.onDirectPress} style={styles.directStyle}>
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
                maxStars={4}
                rating={this.state.data.rating}
                fullStarColor="#4CB33E"
                reversed
                starSize={12}
              />
            </View>
            <OpenAndDistance
              openingStatus={this.state.openingStatus}
              // distance={this.props.item.distance}
            />
          </View>
        </Card>
      );
    }
    return null;
  }
}

export default PinView;
