import React, { PureComponent } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';
import { Images } from '../../../../themes';

class ButtonCustom extends PureComponent {
  state = {
    color: this.props.iconColor,
  };
  render() {
    return (
      <TouchableOpacity style={styles.ViewMain}>
        <Image source={this.props.iconName} style={styles.iconStyle} />
        <Text
          style={{
            fontSize: 9,
            fontWeight: 'bold',
            color: this.state.color,
          }}
        >
          {this.props.title}
        </Text>
      </TouchableOpacity>
    );
  }
}

export default ButtonCustom;
