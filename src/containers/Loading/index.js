import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import Icons from '../../themes/Icons';
import LoadingContainer from '../../components/LoadingContainer';

const FBSDK = require('react-native-fbsdk');

const { LoginButton, AccessToken } = FBSDK;
export default class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.viewLogo}>
          <View style={styles.viewLogoItem}>
            <Image source={Icons.logo} style={styles.imageLogo} />
          </View>
        </View>
        <LoadingContainer />
      </View>
    );
  }
}
