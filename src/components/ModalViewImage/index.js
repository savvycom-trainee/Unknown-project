import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import PropTypes from 'prop-types';
import styles from './styles';
import { Icons } from '../../themes';

export default class ModalViewImage extends Component {
  state = {};
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.viewButtonForm}>
          <TouchableOpacity style={styles.viewButton} onPress={this.props.onShowModalImage}>
            <Image source={Icons.close} />
          </TouchableOpacity>
        </View>
        <ImageZoom
          cropWidth={Dimensions.get('window').width}
          cropHeight={Dimensions.get('window').height}
          imageWidth={Dimensions.get('window').width}
          imageHeight={Dimensions.get('window').height}
        >
          <Image style={styles.ImageBG} source={{ uri: this.props.photoView }} />
        </ImageZoom>
      </View>
    );
  }
}
ModalViewImage.propTypes = {
  onShowModalImage: PropTypes.func.isRequired,
  photoView: PropTypes.string, // eslint-disable-line
  style: PropTypes.any, // eslint-disable-line
};

ModalViewImage.defaultProps = {
  style: styles.container,
};
