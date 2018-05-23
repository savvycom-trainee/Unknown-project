import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import Icons from '../../themes/Icons';

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
        <View style={styles.viewForm}>
          <TouchableOpacity style={styles.viewButton} onPress={() => this._onPost()}>
            <Text style={styles.textButtonPost}>Login</Text>
          </TouchableOpacity>
          {/* tesst login facebook */}
          <LoginButton
            publishPermissions={['publish_actions']}
            onLoginFinished={(error, result) => {
              if (error) {
                alert(`login has error: ${result.error}`);
              } else if (result.isCancelled) {
                alert('login is cancelled.');
              } else {
                AccessToken.getCurrentAccessToken().then((data) => {
                  alert(data.accessToken.toString());
                });
              }
            }}
            onLogoutFinished={() => alert('logout.')}
          />
        </View>
      </View>
    );
  }
}
