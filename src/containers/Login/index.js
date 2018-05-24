import React, { PureComponent } from 'react';
import {
  ScrollView,
  StatusBar,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import firebase from 'react-native-firebase';
import login from './style/login';
import images from '../../themes/Icons';

class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      password: '',
      user: null,
      isLoading: false,
    };
  }
  changeAccount = (text) => {
    this.setState({
      account: text,
    });
  };
  changePassword = (text) => {
    this.setState({
      password: text,
    });
  };
  accNext = () => {
    this.passwordField.focus();
  };
  loginAccount = () => {
    const acc = this.state.account;
    const pass = this.state.password;
    this.setState(
      {
        isLoading: true,
      },
      () => {
        firebase
          .auth()
          .signInAndRetrieveDataWithEmailAndPassword(acc, pass)
          .then((loginUser) => {
            this.setState(
              {
                user: loginUser,
                isLoading: false,
              },
              () => {
                this.props.navigation.navigate('Home', {
                  user: this.state.user,
                });
              },
            );
          })
          .catch((error) => {
            this.setState(
              {
                isLoading: false,
              },
              () => {
                const { code } = error;
                let message = '';
                switch (code) {
                  case 'auth/invalid-email':
                    message = 'Email không đúng định dạng';
                    break;
                  case 'auth/user-disabled':
                    message = 'Tài khoản ngừng hoạt động';
                    break;
                  case 'auth/user-not-found':
                    message = 'Tài khoản không tồn tại';
                    break;
                  case 'auth/wrong-password':
                    message = 'Mật khẩu không chính xác';
                    break;
                  default:
                    message = 'Tài khoản hoặc mật khẩu không đúng';
                    break;
                }
                Alert.alert('Notice', message, [
                  {
                    text: 'OK',
                  },
                ]);
              },
            );
          });
      },
    );
  };
  render() {
    return (
      <ScrollView style={login.container}>
        <StatusBar backgroundColor="rgb(76, 196, 57)" barStyle="light-content" />
        <View style={login.cirleView}>
          <View style={login.cirle}>
            <Image source={images.logo} style={login.image} />
          </View>
        </View>
        <View style={login.loginForm}>
          <View style={login.form}>
            <TextInput
              style={login.input}
              placeholder="Email"
              underlineColorAndroid="transparent"
              onChangeText={this.changeAccount}
              onSubmitEditing={this.accNext}
              returnKeyType="next"
              autoCapitalize="none"
            />
            <TextInput
              ref={(ref) => {
                this.passwordField = ref;
              }}
              style={login.input}
              placeholder="Password"
              underlineColorAndroid="transparent"
              secureTextEntry
              onChangeText={this.changePassword}
              onSubmitEditing={this.loginAccount}
              autoCapitalize="none"
            />
          </View>
          <View style={login.vButton}>
            <TouchableOpacity style={login.btnLogin} onPress={this.loginAccount}>
              {!this.state.isLoading ? (
                <Text style={login.txtBtn}> LOG IN </Text>
              ) : (
                <ActivityIndicator size="small" color="white" />
              )}
            </TouchableOpacity>
            <TouchableOpacity style={login.btnfb}>
              <Image source={images.logofb} style={login.logofb} />
              <Text style={login.txtfb}> Continue With Facebook </Text>
            </TouchableOpacity>
          </View>
          <Text style={login.txtBottom}>
            Not account ? Go to
            <Text style={login.txtSignup} onPress={() => this.props.navigation.navigate('Signup')}>
              {' '}
              Sign up
            </Text>
          </Text>
        </View>
      </ScrollView>
    );
  }
}
Login.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
export default Login;
