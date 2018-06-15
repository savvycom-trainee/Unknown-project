import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import { Icons } from '../../themes';

export default class ModalViewImage extends Component {
  state = {};
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.viewImageBG}>
          <Image style={styles.ImageBG} source={{ uri: this.props.photoView }} />
        </View>
        <View style={styles.viewButtonForm}>
          <TouchableOpacity style={styles.viewButton} onPress={this.props.onShowModalImage}>
            <Image source={Icons.close} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
ModalViewImage.propTypes = {
  onShowModalImage: PropTypes.func.isRequired,
  photoView: PropTypes.string, // eslint-disable-line
};
