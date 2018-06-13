import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';

import { View, Text, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import Loading from '../../../../components/LoadingContainer';
import { Icons, Colors } from '../../../../themes';
import { fetchDatagetBookmark } from '../../../../actions/getBookmarkAction';
// import { O_DIRECTORY } from 'constants';

class ButtonBookmark extends PureComponent {
  state = {};
  componentDidMount() {
    this.getUser();
  }

  getUser = async () => {
    const user = await AsyncStorage.getItem('user');
    const userId = JSON.parse(user).uid;
    console.log(userId);
    this.props.fetchDatagetBookmark(userId, this.props.idRestaurant);
  };
  pressBookmark = async () => {
    const user = await AsyncStorage.getItem('user');
    const userId = JSON.parse(user).uid;
    const restaurantId = this.props.idRestaurant;
    firebase
      .database()
      .ref(`/root/users/${userId}/bookmark/${restaurantId}`)
      .set({ status: !this.props.dataBookmark.data });
  };

  renderButtonIcon = () => {
    console.log(this.props.dataBookmark.data);

    if (this.props.dataBookmark.data) {
      return (
        <View style={styles.ViewMain}>
          <Image source={Icons.pinFocused} style={styles.iconStyle} />
          <Text
            style={{
              fontSize: 9,
              fontWeight: 'bold',
              color: Colors.default,
            }}
          >
            Bookmark
          </Text>
        </View>
      );
    }
    return (
      <View style={styles.ViewMain}>
        <Image source={Icons.pin} style={styles.iconStyle} />
        <Text
          style={{
            fontSize: 9,
            fontWeight: 'bold',
            color: Colors.text,
          }}
        >
          Bookmark
        </Text>
      </View>
    );
  };

  render() {
    if (this.props.dataBookmark.isFetching === true) {
      return (
        <View style={styles.ViewMain}>
          <Loading />
        </View>
      );
    }
    return (
      <TouchableOpacity style={styles.ViewMain} onPress={this.pressBookmark}>
        {this.renderButtonIcon()}
      </TouchableOpacity>
    );
  }
}

ButtonBookmark.propTypes = {
  // onPressButton: PropTypes.func,
  dataBookmark: PropTypes.object.isRequired,
  // dataPlaceDetail: PropTypes.object.isRequired,
  fetchDatagetBookmark: PropTypes.func.isRequired,
  idRestaurant: PropTypes.string.isRequired,
};

ButtonBookmark.defaultProps = {
  // onPressButton: () => {},
};

const mapStateToProps = state => ({
  dataBookmark: state.getBookmarkReducers,
});

const mapDispatchToProps = dispatch => ({
  fetchDatagetBookmark: (userId, restaurantId) =>
    dispatch(fetchDatagetBookmark(userId, restaurantId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ButtonBookmark);
// export default ButtonBookmark;
