import React, { Component } from 'react';
import { View, Image, TouchableOpacity, FlatList, Modal } from 'react-native';
import PropTypes from 'prop-types';
import AsyncImage from '../../../components/AsyncImage';
import ModalViewImage from '../../../components/ModalViewImage';
import styles from './styles';
import { Icons, Colors } from '../../../themes';

export default class ModalListImage extends Component {
  constructor(props) {
    super(props);
    this.state = { modalVisible: false, photoView: null };
  }
  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };
  _onViewPhoto(item) {
    console.log('ajj', item);
    this.setState({ photoView: item });
    this.setModalVisible(true);
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal animationType="slide" transparent={false} visible={this.state.modalVisible}>
          <ModalViewImage
            onShowModalImage={() => this.setModalVisible(!this.state.modalVisible)}
            photoView={this.state.photoView}
          />
        </Modal>
        <View style={styles.viewButtonForm}>
          <TouchableOpacity style={styles.viewButton} onPress={this.props.hideModalListImage}>
            <Image source={Icons.close} />
          </TouchableOpacity>
          <FlatList
            numColumns={1}
            data={this.props.arrayImage}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  this._onViewPhoto(item);
                }}
              >
                <AsyncImage
                  style={
                    this.props.arrayImage.lenght > 3
                      ? styles.imagePhotoItem3
                      : styles.imagePhotoItem4
                  }
                  source={{ uri: item }}
                  placeholderColor={Colors.textOpacity10}
                />
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
            onEndReachedThreshold={0.5}
          />
        </View>
      </View>
    );
  }
}
ModalListImage.propTypes = {
  hideModalListImage: PropTypes.func.isRequired,
  arrayImage: PropTypes.array, // eslint-disable-line
};
