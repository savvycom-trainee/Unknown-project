import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Image } from 'react-native';
import styles from './style';
import { Icons } from '../../../../themes';

class ShowImage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
    };
    props.onRef(this);
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
      <View style={styles.container}>
        <TouchableOpacity style={this.props.btnStyle} onPress={this.close}>
          <Image source={Icons.close} />
        </TouchableOpacity>
        <Image source={this.props.source} style={this.props.styleImage} />
      </View>
    ) : null;
  }
}

ShowImage.propTypes = {
  source: PropTypes.any.isRequired, // eslint-disable-line
  styleImage: PropTypes.any, // eslint-disable-line
  btnStyle: PropTypes.any, // eslint-disable-line
  onRef: PropTypes.func.isRequired,
};

ShowImage.defaultProps = {
  styleImage: styles.image,
  btnStyle: styles.btnStyle,
};

export default ShowImage;
