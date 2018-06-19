import React, { PureComponent } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';
import { Images } from '../../../../themes';

class ButtonCustom extends PureComponent {
  state = {
    // color: this.props.iconColor,
  };
  render() {
    return (
      <TouchableOpacity style={styles.ViewMain} onPress={this.props.onPressButton}>
        <Image source={this.props.iconName} style={styles.iconStyle} />
        <Text
          style={{
            fontSize: 9,
            fontWeight: 'bold',
            color: this.props.iconColor,
          }}
        >
          {this.props.title}
        </Text>
      </TouchableOpacity>
    );
  }
}

ButtonCustom.propTypes = {
  onPressButton: PropTypes.func,
  iconName: PropTypes.number.isRequired,
  iconColor: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

ButtonCustom.defaultProps = {
  onPressButton: () => {},
};

export default ButtonCustom;
