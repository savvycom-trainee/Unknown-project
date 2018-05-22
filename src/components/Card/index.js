import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import * as d from '../../utilities/Tranform';

const Card = props => (
  <TouchableOpacity
    onPress={props.onPress}
    style={{
      backgroundColor: '#FFFFFF',
      borderRadius: 2.5,
      flexDirection: props.direction,
      marginHorizontal: 30 * d.ratioW,
      marginTop: 25 * d.ratioH,
      zIndex: 0,
    }}
  >
    {/* eslint-disable-next-line */}
    {props.children}
  </TouchableOpacity>
);

Card.propTypes = {
  onPress: PropTypes.func,
  direction: PropTypes.string,
};

Card.defaultProps = {
  onPress: () => {},
  direction: 'column',
};

export default Card;
