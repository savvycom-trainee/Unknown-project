import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
// import StarRating from 'react-native-star-rating';

import { View, Text, Image } from 'react-native';
import card from './style';

class Card extends PureComponent {
  state = {};
  componentDidMount() {
    // console.log(this.props.dataSearch);
    // console.log(this.props.dataSearch.hasOwnProperty('photos'));
  }

  renderPhotos = (data) => {
    if (data.hasOwnProperty('photos')) {
      return (
        <Image
          source={{
            uri: `https://maps.googleapis.com/maps/api/place/photo?photoreference=${
              data.photos[0].photo_reference
            }&sensor=false&maxheight=250&maxwidth=250&key=AIzaSyCthR5BEn21xBOMCGo-qqui8a9jDRNLDOk`,
          }}
          style={card.image}
        />
      );
    }
    return (
      <Image
        source={require('../../../../../assets/images/restaurantPhoto.png')}
        style={card.image}
      />
    );
  };

  render() {
    return (
      <View style={card.component}>
        <View style={card.container}>
          <View style={card.imageView}>
            {this.renderPhotos(this.props.dataSearch)}
            <View style={card.circle}>
              <Text style={card.txtCircle}>{this.props.dataSearch.rating}</Text>
            </View>
          </View>
          <View style={card.cardInfo}>
            <Text style={card.name}>{this.props.dataSearch.name}</Text>
            <View style={card.typeView}>
              <Text style={card.status}>Restaurant</Text>
            </View>
            <View style={card.statusView}>
              <Text style={card.status}>Open Now</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
Card.propTypes = {
  dataSearch: PropTypes.object.isRequired,
};

export default Card;
