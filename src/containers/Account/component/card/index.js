import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image } from 'react-native';
import card from './style';

const Card = props => (
  <View style={card.container}>
    <View style={card.circle}>
      <Text style={card.txtCircle}>{props.review}</Text>
    </View>
    <View style={card.imageView}>
      <Image
        style={card.image}
        source={props.image}
      />
    </View>
    <View style={card.infoView}>
      <Text style={card.name}>{props.name}</Text>
      <View style={card.statusView}>
        <Text style={card.status}>{props.status === 1 ? 'Open Now' : 'Closed'}</Text>
        <Text style={card.dot}>.</Text>
        <Text style={card.distance}>
          {props.distance < 1 ? `${props.distance * 1000}m` : `${props.distance} Km`} from you
        </Text>
      </View>
    </View>
  </View>
);

Card.propTypes = {
  image: PropTypes.any.isRequired, // eslint-disable-line
  name: PropTypes.string.isRequired,
  status: PropTypes.number.isRequired,
  distance: PropTypes.number.isRequired,
  review: PropTypes.number.isRequired,
};

export default Card;
