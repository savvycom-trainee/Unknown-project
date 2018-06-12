import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import modal from './ModalStyle';

export default class Modal extends Component {
  state = {
    modalVisible: false,
    params: 1,
  };
  componentDidMount() {
    this.props.onRef(this);
  }
  open = () => {
    // this.setState({ params });

    this.setState({ modalVisible: true });
  };
  close = () => {
    this.setState({ modalVisible: false });
  };
  render() {
    return this.state.modalVisible ? (
      <View
        style={{
          height: '100%',
          width: '100%',
          position: 'absolute',
          zIndex: 100,
        }}
      >
        <View style={[modal.modalContainer, this.props.style]}>
          <TouchableOpacity style={modal.view} onPress={() => this.close()} />
          {this.props.children}
        </View>
      </View>
    ) : null;
  }
}

Modal.propTypes = {
  onRef: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
  style: PropTypes.object,
};

Modal.defaultProps = {
  style: StyleSheet.create({}),
};
