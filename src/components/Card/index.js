import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import * as d from '../../utilities/Tranform';

const Card = props => (
  <TouchableOpacity
    onPress={props.onPress}
    style={[
      {
        backgroundColor: '#FFFFFF',
        borderRadius: 2.5,
        flexDirection: props.direction,
        position: 'relative',
        zIndex: 0,
      },
      props.style,
    ]}
  >
    {/* eslint-disable-next-line */}
    {props.children}
  </TouchableOpacity>
);

Card.propTypes = {
  onPress: PropTypes.func,
  direction: PropTypes.string,
  style: PropTypes.object,
};

Card.defaultProps = {
  onPress: () => {},
  direction: 'column',
  style: {},
};

export default Card;
