import React from 'react';
import { View, TouchableOpacity, StatusBar, Text } from 'react-native';
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
    <StatusBar backgroundColor="transparent" barStyle="dark-content" />
    <View style={styles.headerComponent}>
      <TouchableOpacity onPress={onPressLeftHeader} style={styles.leftHeaderStyle}>
        {leftHeader}
      </TouchableOpacity>
      <View style={styles.centerHeaderStyle}>
        <Text>{centerHeader}</Text>
      </View>
      <TouchableOpacity onPress={onPressRightHeader} style={styles.rightHeaderStyle}>
        {rightHeader}
      </TouchableOpacity>
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
  leftHeader: null,
  centerHeader: null,
  rightHeader: null,
  onPressLeftHeader: () => {},
  onPressRightHeader: () => {},
};

export default Header;
