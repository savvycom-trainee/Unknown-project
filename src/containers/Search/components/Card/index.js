import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import card from './style';

const Card = props => (
  <TouchableOpacity onPress={props.onPress} style={card.component}>
    {/* eslint-disable-next-line */}
    {props.children}
  </TouchableOpacity>
);

Card.propTypes = {
  onPress: PropTypes.func,
};

Card.defaultProps = {
  onPress: () => {},
};

class CardSearch extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dataSearch: this.props.dataSearch,
    };
  }
  render() {
    return (
      <View>
        {this.state.dataSearch.map(item => (
          <Card key={item.id}>
            <View style={card.container}>
              <View style={card.imageView}>
                <Image source={item.image} style={card.image} />
                <View style={card.circle}>
                  <Text style={card.txtCircle}>{item.number}</Text>
                </View>
              </View>
              <View style={card.cardInfo}>
                <Text style={card.name}>{item.name}</Text>
                <View style={card.typeView}>
                  <Text style={card.type}>{item.type}</Text>
                  <Text style={card.review}>$</Text>
                  <Text style={[card.review, { color: 'rgb(66, 183, 42)' }]}>$$$</Text>
                </View>
                <View style={card.statusView}>
                  <Text style={card.status}>{item.status === 1 ? 'Open Now' : 'Closed'}</Text>
                  <Text style={card.dot}>.</Text>
                  <Text style={card.distance}>
                    {item.distance < 1 ? `${item.distance * 1000}m` : `${item.distance} Km`} from
                    you
                  </Text>
                </View>
              </View>
            </View>
          </Card>
        ))}
      </View>
    );
  }
}

CardSearch.propTypes = {
  dataSearch: PropTypes.array.isRequired,
};

export default CardSearch;
