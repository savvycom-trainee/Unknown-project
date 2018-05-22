import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

const GreenCircle = props => (
  <TouchableOpacity onPress={props.onPress} style={[styles.container, props.style]}>
    <View>{props.children}</View>
  </TouchableOpacity>
);

GreenCircle.propTypes = {
  children: PropTypes.element.isRequired,
  onPress: PropTypes.func,
  style: PropTypes.object,
};

GreenCircle.defaultProps = {
  onPress: () => {},
  style: {},
};

export default GreenCircle;
