import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, TouchableOpacity, View, Image } from 'react-native';
import { Icons } from '../../../../themes';
import styles from './style';

const value = -220;

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      showAni: new Animated.Value(value),
    };
    props.onRef(this);
  }
  close = () => {
    console.log('close');
    Animated.timing(this.state.showAni, {
      toValue: value,
      duration: 350,
    }).start();
    setTimeout(() => {
      this.setState({
        isShow: false,
      });
    }, 150);
  };
  open = () => {
    this.setState(
      {
        isShow: true,
      },
      () => {
        console.log('open');
        Animated.timing(this.state.showAni, {
          toValue: 0,
          duration: 350,
        }).start();
      },
    );
  };
  render() {
    return this.state.isShow ? (
      <View style={this.props.style}>
        <TouchableOpacity style={styles.view} onPress={this.close} />
        <Animated.View style={[styles.animation, { right: this.state.showAni }]}>
          <View style={styles.menuHeader}>
            <Image style={styles.imageHeader} source={Icons.logo} />
          </View>
          {this.props.children}
        </Animated.View>
      </View>
    ) : null;
  }
}

Menu.propTypes = {
  onRef: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired, // eslint-disable-line
  style: PropTypes.any, // eslint-disable-line
};

Menu.defaultProps = {
  style: styles.container,
};

export default Menu;
