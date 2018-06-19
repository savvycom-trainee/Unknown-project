import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import { View, Text, Image, FlatList, TouchableOpacity, Modal } from 'react-native';
import Moment from 'moment';
import styles from './styles';
import { Colors } from '../../../../themes';
import ModalViewImage from '../../../../components/ModalViewImage';
// import { Images } from '../../../../themes';

class Content extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      photoView: null,
    };
  }

  setModalVisible(visible) {
    console.log('visible', visible);
    this.setState({
      modalVisible: visible,
    });
  }
  _onViewPhoto(item) {
    this.setState({ photoView: item });
    this.setModalVisible(true);
  }
  gallery() {
    // console.log(this.props.data.content.photos);
    // eslint-disable-next-line
    if (this.props.data.content.hasOwnProperty('photos')) {
      if (this.props.data.content.photos <= 0) {
        return null;
      }
      console.log(this.props.data.content.photos[3]);

      if (this.props.data.content.photos.length > 3) {
        const dataPhotos = [
          this.props.data.content.photos[0],
          this.props.data.content.photos[1],
          this.props.data.content.photos[2],
        ];
        return (
          <FlatList
            style={styles.ViewGallery}
            data={dataPhotos}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => this._onViewPhoto(item)}>
                <Image source={{ uri: item }} style={styles.gallery} />
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        );
      }
      return (
        <FlatList
          style={styles.ViewGallery}
          data={this.props.data.content.photos}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => this._onViewPhoto(item)}>
              <Image source={{ uri: item }} style={styles.gallery} />
            </TouchableOpacity>
            )}
          keyExtractor={(item, index) => index.toString()}
        />
      );
    }
    return null;
  }

  render() {
    return (
      <View style={styles.ViewMain}>
        <Modal animationType="slide" transparent={false} visible={this.state.modalVisible}>
          <ModalViewImage
            onShowModalImage={() => this.setModalVisible(!this.state.modalVisible)}
            photoView={this.state.photoView}
          />
        </Modal>
        <View style={styles.ViewMainChild}>
          <View style={styles.ViewMainChildTop}>
            <View style={styles.ViewAvatar}>
              {this.props.data.userAvatar ? (
                <Image source={{ uri: this.props.data.userAvatar }} style={styles.avatar} />
              ) : (
                <Icon name="md-contact" size={35} color={Colors.textOpacity} />
              )}
            </View>
            <View style={styles.ViewNameHours}>
              <Text style={styles.TextName}>{this.props.data.userName}</Text>
              <Text style={styles.TextHoursComment}>
                {Moment(this.props.data.created).format('h:mm a, Do MMMM YYYY')}
              </Text>
            </View>
            <View style={styles.ViewScore}>
              <Text style={styles.TextScore}>{this.props.data.rating}/5</Text>
            </View>
          </View>
          <View style={styles.ViewMainChildBottom}>
            <Text style={styles.TextHoursComment}>{this.props.data.content.detail}</Text>
          </View>
          {this.gallery()}
          <View style={styles.ViewMainChildBottom}>
            <Text style={styles.TextHoursComment2}>{this.props.data.restaurantName}</Text>
          </View>
        </View>
      </View>
    );
  }
}

Content.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Content;
