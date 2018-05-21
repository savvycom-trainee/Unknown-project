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
} from 'react-native';
import PropTypes from 'prop-types';
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import login from './style/login';
import images from '../../themes/Icons';

const shadow = {
  elevation: 10,
  shadowOffset: {
    width: 10,
    height: 10,
  },
  shadowColor: 'grey',
  shadowOpacity: 1,
  shadowRadius: 5,
};
class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      password: '',
      user: null,
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
    firebase
      .auth()
      .signInAndRetrieveDataWithEmailAndPassword(acc, pass)
      .then((loginUser) => {
        this.setState(
          {
            user: loginUser,
          },
          () => {
            this.props.navigation.navigate('Home', { user: this.state.user });
          },
        );
      })
      .catch(() => {
        Alert.alert('Thông báo', {});
      });
  };
  render() {
    return (
      <ScrollView style={login.container}>
        <StatusBar backgroundColor="lightgreen" barStyle="light-content" />
        <View style={login.cirleView}>
          <View style={login.cirle}>
            <Image source={images.logo} style={login.image} />
          </View>
        </View>
        <View style={login.loginForm}>
          <View style={login.form}>
            <TextInput
              style={[login.input, shadow]}
              placeholder="Username"
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
              style={[login.input, shadow]}
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
              <Text style={login.txtBtn}>LOG IN</Text>
            </TouchableOpacity>
            <Icon.Button name="facebook" size={26} style={{ justifyContent: 'center' }}>
              <Text style={{ fontFamily: 'Arial', fontSize: 18, color: 'white' }}>
                Continue with Facebook
              </Text>
            </Icon.Button>
          </View>
          <Text style={login.txtBottom}>
            Not account? Go to{' '}
            <Text style={login.txtSignup} onPress={() => this.props.navigation.navigate('Signup')}>
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
