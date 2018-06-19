import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { fetchDatagetUserDetail } from '../../../../actions/getUserDetailAction';
import { View, Text, Image, FlatList, TouchableOpacity, Modal } from 'react-native';
import Moment from 'moment';
import styles from './styles';
import { Colors } from '../../../../themes';
import ModalViewImage from '../../../../components/ModalViewImage';
import firebase from 'react-native-firebase';
import Loading from '../../../../components/LoadingContainer';

// import { Images } from '../../../../themes';

class Content extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      photoView: null,
    };
  }
  componentDidMount() {
    this.props.fetchDatagetUserDetail(this.props.data.idUser);
    console.log(this.props.dataUser.data);
    console.log(this.props.data);
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
      return (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.ViewGallery}
          data={this.props.data.content.photos}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => this._onViewPhoto(item)}>
              <Image
                // onPress={() => this._onViewPhoto(item)}
                source={{ uri: item }}
                style={styles.gallery}
              />
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      );
    }
    return null;
  }

  renderU;

  render() {
    console.log(this.props.data);
    if (this.props.dataUser.isFetching == true) {
      return <Loading />;
    }
    console.log(this.props.dataUser.data);

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
              <Text style={styles.TextName}>{this.props.dataUser.data.fullName}</Text>
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
  dataUser: PropTypes.object.isRequired,
  fetchDatagetUserDetail: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  dataUser: state.getUserDetailReducers,
});

const mapDispatchToProps = dispatch => ({
  fetchDatagetUserDetail: id => dispatch(fetchDatagetUserDetail(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Content);
