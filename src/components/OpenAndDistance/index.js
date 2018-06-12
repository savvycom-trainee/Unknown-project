import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

const OpenAndDistance = ({ openingStatus, distance, otherStyle }) => (
  <View style={[styles.footerDetailStyle, otherStyle]}>
    <Text
      style={{
        color: openingStatus ? '#4CB33E' : '#F9593A',
        fontSize: 11,
      }}
    >
      {openingStatus ? 'Open Now' : 'Closed'}
    </Text>
    <Text style={styles.lightSmallTextStyle}>•</Text>
    <Text style={styles.lightSmallTextStyle}>{distance} from you</Text>
  </View>
);

OpenAndDistance.propTypes = {
  openingStatus: PropTypes.bool,
  distance: PropTypes.string,
  otherStyle: PropTypes.object,
};

OpenAndDistance.defaultProps = {
  openingStatus: false,
  distance: 'NaN',
  otherStyle: {},
};

export default OpenAndDistance;
