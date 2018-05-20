import React from 'react';
import { View, TouchableOpacity, StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

const Header = ({
  leftHeader,
  centerHeader,
  rightHeader,
  onPressLeftHeader,
  onPressRightHeader,
}) => (
  <View style={styles.container}>
    <StatusBar backgroundColor="transparent" />
    <View style={styles.headerComponent}>
      <TouchableOpacity onPress={onPressLeftHeader}>{leftHeader}</TouchableOpacity>
      <View>{centerHeader}</View>
      <TouchableOpacity onPress={onPressRightHeader}>{rightHeader}</TouchableOpacity>
    </View>
  </View>
);

Header.propTypes = {
  leftHeader: PropTypes.any, // eslint-disable-line
  centerHeader: PropTypes.any, // eslint-disable-line
  rightHeader: PropTypes.any, // eslint-disable-line
  onPressLeftHeader: PropTypes.func,
  onPressRightHeader: PropTypes.func,
};

Header.defaultProps = {
  leftHeader: '',
  centerHeader: '',
  rightHeader: '',
  onPressLeftHeader: () => {},
  onPressRightHeader: () => {},
};

export default Header;
