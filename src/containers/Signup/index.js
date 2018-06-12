import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import firebase from 'react-native-firebase';
import {
  ScrollView,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import signup from './style';
import images from '../../themes/Icons';
import { setUser } from '../../actions';

class Signup extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      password: '',
      repassword: '',
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
  changeRePassword = (text) => {
    this.setState({
      repassword: text,
    });
  };
  accNext = () => {
    this.passwordField.focus();
  };
  passwordNext = () => {
    this.rePasswordField.focus();
  };
  signupAccount = () => {
    const acc = this.state.account;
    const pass = this.state.password;
    const repass = this.state.repassword;
    if (pass === repass) {
      this.setState(
        {
          isLoading: true,
        },
        () => {
          firebase
            .auth()
            .createUserAndRetrieveDataWithEmailAndPassword(acc, pass)
            .then(({ user }) => {
              this.props.navigation.navigate('UpdateUser', { user: user._user });
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
                    case 'auth/email-already-in-use':
                      message = 'Email is already';
                      break;
                    case 'auth/invalid-email':
                      message = 'Email invalid';
                      break;
                    case 'auth/user-disabled':
                      message = 'User is block';
                      break;
                    case 'auth/user-not-found':
                      message = 'Email is not exist';
                      break;
                    case 'auth/wrong-password':
                      message = 'Password incorrect';
                      break;
                    case 'auth/weak-password':
                      message = 'Password is weak';
                      break;
                    default:
                      message = code;
                      break;
                  }
                  Alert.alert('Notice', message, [{ text: 'OK' }]);
                },
              );
            });
        },
      );
    } else {
      Alert.alert('Notice', 'Comfirm Password incorrect', [{ text: 'OK' }]);
    }
  };
  render() {
    return (
      <ScrollView style={signup.container}>
        <View style={signup.cirleView}>
          <View style={signup.cirle}>
            <Image source={images.logo} style={signup.image} />
          </View>
        </View>
        <View style={signup.signupForm}>
          <View style={signup.form}>
            <TextInput
              style={signup.input}
              placeholder="Email"
              underlineColorAndroid="transparent"
              keyboardType="email-address"
              onChangeText={this.changeAccount}
              onSubmitEditing={this.accNext}
              returnKeyType="next"
              autoCapitalize="none"
            />
            <TextInput
              ref={(ref) => {
                this.passwordField = ref;
              }}
              style={signup.input}
              placeholder="Password"
              underlineColorAndroid="transparent"
              secureTextEntry
              onChangeText={this.changePassword}
              onSubmitEditing={this.passwordNext}
              autoCapitalize="none"
            />
            <TextInput
              ref={(ref) => {
                this.rePasswordField = ref;
              }}
              style={signup.input}
              placeholder="Re-Password"
              underlineColorAndroid="transparent"
              secureTextEntry
              onChangeText={this.changeRePassword}
              onSubmitEditing={this.signupAccount}
              autoCapitalize="none"
            />
          </View>
          <View style={signup.vButton}>
            <TouchableOpacity style={signup.btnsignup} onPress={this.signupAccount}>
              {!this.state.isLoading ? (
                <Text style={signup.txtBtn}>SIGN UP</Text>
              ) : (
                <ActivityIndicator size="small" color="white" />
              )}
            </TouchableOpacity>
            <TouchableOpacity style={signup.btnfb}>
              <Image source={images.logofb} style={signup.logofb} />
              <Text style={signup.txtfb}>Continue With Facebook</Text>
            </TouchableOpacity>
          </View>
          <View style={signup.textContainer}>
            <Text style={signup.txtBottom}>Not account? Go to </Text>
            <TouchableOpacity
              style={signup.textSignUpContainer}
              onPress={() => this.props.navigation.goBack()}
            >
              <Text style={signup.txtSignUp}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}
Signup.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
  }).isRequired,
  // setUser: PropTypes.func.isRequired,
};

export default connect(
  null,
  { setUser },
)(Signup);
