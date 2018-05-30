import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import firebase from 'react-native-firebase';
import images from '../../themes/Images';
import styles from './style';

const defaultProps = {
  name: '',
  photoURL: images.defaultAvatar,
  gender: '',
  home: '',
};

class UpdateUser extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    if (!props.user) {
      this.setState(defaultProps);
    } else {
      this.getUser(props.user);
    }
  }
  componentDidMount() {
    this.props.onRef(this);
  }
  getUser = (user) => {
    firebase
      .database()
      .ref('/restaurant/user')
      .child(user.uid)
      .on('value', (data) => {
        this.setState(data._value);
      });
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>Update</Text>
      </View>
    );
  }
}

UpdateUser.propTypes = {
  onRef: PropTypes.func.isRequired,
  user: PropTypes.bool,
};

UpdateUser.defaultProps = {
  user: false,
};

export default UpdateUser;
