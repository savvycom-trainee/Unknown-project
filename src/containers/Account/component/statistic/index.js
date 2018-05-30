import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import statistic from './style';

const Statistic = props => (
  <View style={statistic.container}>
    <Text style={statistic.number}>{props.number}</Text>
    <Text style={statistic.title}>{props.title}</Text>
  </View>
);

Statistic.propTypes = {
  number: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

export default Statistic;
