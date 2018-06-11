import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { View, Text, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import Loading from '../../../../components/LoadingContainer';
import { Icons, Colors } from '../../../../themes';
import { fetchDatagetBookmark } from '../../../../actions/getBookmarkAction';
// import { O_DIRECTORY } from 'constants';

class ButtonBookmark extends PureComponent {
  state = {
    isBookmark: false,
  };
  componentDidMount() {
    this.getUser();
  }

  getUser = async () => {
    const user = await AsyncStorage.getItem('user');
    const userId = JSON.parse(user).uid;
    console.log(userId);
    console.log(this.props.idRestaurant);

    this.props.fetchDatagetBookmark(userId, this.props.idRestaurant);
  };

  renderButtonIcon = () => {
    console.log(this.props.dataBookmark.data);

    if (this.state.isBookmark) {
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
      return <Loading />;
    }
    return <TouchableOpacity style={styles.ViewMain}>{this.renderButtonIcon()}</TouchableOpacity>;
  }
}

ButtonBookmark.propTypes = {
  // onPressButton: PropTypes.func,
  dataBookmark: PropTypes.object.isRequired,
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
  fetchDatagetBookmark: id => dispatch(fetchDatagetBookmark(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ButtonBookmark);
// export default ButtonBookmark;
