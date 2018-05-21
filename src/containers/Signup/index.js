import React, { PureComponent } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import { ScrollView, View, Image, TextInput, TouchableOpacity, Text } from 'react-native';
import signup from './style';
import images from '../../themes/Icons';

const shadow = {
  elevation: 10,
};
class Signup extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      password: '',
      repassword: '',
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
      if (acc === 'chien123') {
        if (pass === '123') {
          console.log('signup success');
        } else {
          console.log('password incorrect');
        }
      } else {
        console.log('account not exit!');
      }
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
              style={[signup.input, shadow]}
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
              style={[signup.input, shadow]}
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
              style={[signup.input, shadow]}
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
              <Text style={signup.txtBtn}>SIGN UP</Text>
            </TouchableOpacity>
            <Icon.Button name="facebook" size={26} style={{ justifyContent: 'center' }}>
              <Text style={{ fontFamily: 'Arial', fontSize: 16, color: 'white' }}>
                Continue with Facebook
              </Text>
            </Icon.Button>
          </View>
          <Text style={signup.txtBottom}>
            Not account? Go to{' '}
            <Text style={signup.txtSignup} onPress={() => this.props.navigation.goBack()}>
              SignIn
            </Text>
          </Text>
        </View>
      </ScrollView>
    );
  }
}
Signup.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};
export default Signup;
