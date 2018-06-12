import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import card from './style';

const Card = props => (
  <View style={card.container}>
    <TouchableOpacity>
      <View style={card.circle}>
        <Text style={card.txtCircle}>{props.review}</Text>
      </View>
      <View style={card.imageView}>
        <Image style={card.image} source={{ uri: props.image }} />
      </View>
      <View style={card.infoView}>
        <Text style={card.name} numberOfLines={1}>
          {props.name}
        </Text>
        <View style={card.statusView}>
          <Text style={card.status}>{props.status === 1 ? 'Open Now' : 'Closed'}</Text>
          <Text style={card.dot}>.</Text>
          <Text style={card.distance} numberOfLines={1}>
            {props.restaurantVicinity}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  </View>
);

Card.propTypes = {
  image: PropTypes.any.isRequired, // eslint-disable-line
  name: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  restaurantVicinity: PropTypes.string.isRequired,
  review: PropTypes.number.isRequired,
};

export default Card;
