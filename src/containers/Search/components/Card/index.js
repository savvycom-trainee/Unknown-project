import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image } from 'react-native';
import card from './style';
import Card from '../../../../components/Card';

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
                <Text style={card.name}>Sublimotion</Text>
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
