import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, AsyncStorage, Alert } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './styles';
import Icons from '../../themes/Icons';
import LoadingContainer from '../../components/LoadingContainer';
import { fetchDataGetUserFBAdd } from '../../actions';

const FBSDK = require('react-native-fbsdk');

const { LoginButton, AccessToken } = FBSDK;
class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
    };
  }
  componentDidMount() {
    this.getToken();
  }
  getToken = async () => {
    try {
      const Token = await AsyncStorage.getItem('Token');
      if (Token) {
        const userToken = JSON.parse(Token);
        this.setState({
          token: userToken,
        });
        console.log('skks', this.state.token);
      } else {
        console.log('loi');
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.viewLogo}>
          <View style={styles.viewLogoItem}>
            <Image source={Icons.logo} style={styles.imageLogo} />
          </View>
        </View>
        <LoginButton
          publishPermissions={['publish_actions']}
          onLoginFinished={(error, result) => {
            if (error) {
              Alert.alert(`login has error: ${result.error}`);
            } else if (result.isCancelled) {
              Alert.alert('login is cancelled.');
            } else {
              AccessToken.getCurrentAccessToken().then((data) => {
                const { accessToken } = data;
                try {
                  AsyncStorage.setItem('Token', JSON.stringify(accessToken));
                  console.log(accessToken);
                } catch (error) {
                  console.log(error);
                }
              });
            }
          }}
          onLogoutFinished={() => {
            Alert.alert('logout.');
            AsyncStorage.removeItem('Token');
          }}
        />
      </View>
    );
  }
}
Loading.protoType = {
  fetchDataGetUserFBAdd: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  userFacebook: state.getUserFacebookReducers,
});
export default connect(mapStateToProps, { fetchDataGetUserFBAdd })(Loading);
