import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import styles from './style';

export default class ResetPassword extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
    };
    this.props.onRef(this);
  }
  open = () => {
    this.setState({
      isShow: true,
    });
  };
  close = () => {
    this.setState({
      isShow: false,
    });
  };
  render() {
    return this.state.isShow ? (
      <View style={this.props.style}>
        <Text>Day la Reset</Text>
        <Text style={{ padding: 20 }} onPress={this.close}>
          Close
        </Text>
      </View>
    ) : null;
  }
}

ResetPassword.propTypes = {
  onRef: PropTypes.func.isRequired,
  style: PropTypes.any, //eslint-disable-line
};

ResetPassword.defaultProps = {
  style: styles.container,
};
