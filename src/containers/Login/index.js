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
import FBSDK from 'react-native-fbsdk';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import login from './style/login';
import images from '../../themes/Icons';
import { setUser } from '../../actions';
import LoadingContainer from '../../components/LoadingContainer';

const { LoginButton, AccessToken, LoginManager } = FBSDK;

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
        this.setState({ isLoading: false });
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
  handleFacebookLogin() {
    console.log(this.state.isLoading);
    LoginManager.logInWithReadPermissions(['public_profile', 'email', 'user_friends']).then(
      (result) => {
        console.log(result);
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);
        }
      },
      (error) => {
        console.log(`Login fail with error: ${error}`);
      },
    );
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
        console.log(acc, pass);
        firebase
          .auth()
          .signInAndRetrieveDataWithEmailAndPassword(acc, pass)
          .then((loginUser) => {
            console.log(loginUser);
            firebase
              .database()
              .ref('/restaurant/user')
              .child(loginUser.user.uid)
              .on('value', (data) => {
                this.setState(
                  {
                    isLoading: false,
                  },
                  () => {
                    try {
                      const user = {
                        ...data._value,
                        uid: data.key,
                      };
                      AsyncStorage.setItem('user', JSON.stringify(user));
                      this.move(user);
                    } catch (error) {
                      console.log(error);
                    }
                  },
                );
              });
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
    return (
      <View style={{ flex: 1, backgroundColor: '#FFF' }}>
        <ScrollView style={login.container}>
          <StatusBar backgroundColor="rgb(76, 196, 57)" barStyle="light-content" />
          <View style={login.cirleView}>
            <View style={login.cirle}>
              <Image source={images.logo} style={login.image} />
            </View>
          </View>
          {this.state.isLoading ? (
            <LoadingContainer />
          ) : (
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
                <TouchableOpacity style={login.btnfb} onPress={() => this.handleFacebookLogin()}>
                  <Image source={images.logofb} style={login.logofb} />
                  <Text style={login.txtfb}> Continue With Facebook </Text>
                </TouchableOpacity>
                {/* <LoginButton
                  publishPermissions={['publish_actions']}
                  onLoginFinished={(error, result) => {
                    if (error) {
                      console.log(`login has error: ${result.error}`);
                      Alert.alert(`login has error: ${result.error}`);
                    } else if (result.isCancelled) {
                      console.log('login is cancelled.');
                      Alert.alert('login is cancelled.');
                    } else {
                      AccessToken.getCurrentAccessToken().then((data) => {
                        console.log(data);
                        const { accessToken } = data;
                        try {
                          AsyncStorage.setItem('Token', JSON.stringify(accessToken));
                        } catch (error1) {
                          console.log(error1);
                        }
                      });
                    }
                  }}
                  onLogoutFinished={() => {
                    console.log('logout.');
                    AsyncStorage.removeItem('Token');
                  }}
                /> */}
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
          )}
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
