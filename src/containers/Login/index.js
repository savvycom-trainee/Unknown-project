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
  AsyncStorage,
} from 'react-native';
import PropTypes from 'prop-types';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import login from './style/login';
import images from '../../themes/Icons';
import { setUser } from '../../actions';
import LoadingOverlap from '../LoadingOverlap';
import Loading from '../Loading';

class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      password: '',
      isLoading: true,
    };
  }
  componentDidMount() {
    this.getUser();
  }
  getUser = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        const tmpUser = JSON.parse(user);
        this.move(tmpUser);
      } else {
        console.log('eo co gif');
      }
    } catch (error) {
      console.log(error);
    }
  };
  move = (user) => {
    this.props.setUser(user);
    const navigateAction = NavigationActions.navigate({
      routeName: 'Home',
      params: user,
      action: NavigationActions.navigate({
        routeName: 'Home',
        params: { user, newUser: true },
      }),
    });
    this.props.navigation.dispatch(navigateAction);
  };
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
                isLoading: false,
              },
              () => {
                try {
                  // console.warn('', loginUser);
                  AsyncStorage.setItem('user', JSON.stringify(loginUser.user._user));
                  this.move(loginUser.user._user);
                } catch (error) {
                  console.log(error);
                }
              },
            );
          })
          // .then(() => {
          //   console.log(this.state.user.user._user.uid);
          //   firebase
          //     .database()
          //     .ref('/restaurant/user')
          //     .push({

          //     });
          // })
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
                    message = 'Email invalidate';
                    break;
                  case 'auth/user-disabled':
                    message = 'user disabled';
                    break;
                  case 'auth/user-not-found':
                    message = 'Email not exist';
                    break;
                  case 'auth/wrong-password':
                    message = 'Password incorrect';
                    break;
                  default:
                    message = 'Email or password incorrect';
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
    return this.state.isLoading ? (
      <Loading />
    ) : (
      <View style={{ flex: 1, backgroundColor: '#FFF' }}>
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
                keyboardType="email-address"
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
              <TouchableOpacity
                style={login.btnfb}
                onPress={() => this.props.navigation.navigate('Home')}
              >
                <Image source={images.logofb} style={login.logofb} />
                <Text style={login.txtfb}> Continue With Facebook </Text>
              </TouchableOpacity>
            </View>
            <Text style={login.txtBottom}>
              Not account ? Go to{' '}
              <Text
                style={login.txtSignup}
                onPress={() => this.props.navigation.navigate('Signup')}
              >
                Sign up
              </Text>
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}
Login.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
  }).isRequired,
  setUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({ setUser: user => dispatch(setUser(user)) });

export default connect(null, mapDispatchToProps)(Login);
