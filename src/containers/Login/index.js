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
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

import PropTypes from 'prop-types';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import login from './style/login';
import images from '../../themes/Icons';
import { setUser } from '../../actions';
import LoadingContainer from '../../components/LoadingContainer';

class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      password: '',
      isLoading: true,
    };
    this.permissions = ['user_age_range', 'user_hometown', 'email', 'user_gender', 'user_birthday'];
    this.user = {};
  }
  componentDidMount() {
    this.getUser();
  }
  getUser = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      if (user !== null) {
        const tmpUser = JSON.parse(user);
        this.move(tmpUser);
      } else {
        this.setState({ isLoading: false });
      }
    } catch (error) {
      // code
    }
  };
  move = (user) => {
    this.props.setUser(user);
    this.setState({
      isLoading: false,
    });
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
            firebase
              .database()
              .ref('/root/users')
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
                      // code
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
  loginFacebook = () => {
    LoginManager.logInWithReadPermissions(['public_profile', 'user_friends', 'email']).then(
      (result) => {
        if (result.isCancelled) {
          Alert.alert('Whoops!', 'You cancelled the sign in.');
        } else {
          AccessToken.getCurrentAccessToken().then(async (data) => {
            const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
            this._getInfoFb(credential);
          });
        }
      },
      (error) => {
        Alert.alert('Sign in error', error);
      },
    );
  };
  _getInfoFb = (credential) => {
    const infoRequest = new GraphRequest(
      'me?fields=id,name,birthday,email,gender,hometown',
      null,
      (err, res) => {
        if (err) {
          Alert.alert('Error', 'Cant get info');
        } else {
          firebase
            .database()
            .ref(`root/users/${res.id}`)
            .once('value')
            .then((snapshot) => {
              if (snapshot.val() === null) {
                firebase
                  .auth()
                  .signInAndRetrieveDataWithCredential(credential)
                  .then(() => {
                    const user = { ...res, uid: res.id, fullName: res.name };
                    firebase
                      .database()
                      .ref(`root/users/${user.uid}`)
                      .set(user);
                    AsyncStorage.setItem('user', JSON.stringify(user));
                    this.props.navigation.navigate('UpdateUser', { user, fb: true });
                  });
              } else {
                const user = { ...snapshot.val(), uid: res.id };
                this.props.setUser(user);
                AsyncStorage.setItem('user', JSON.stringify(user));
                this.props.navigation.navigate('Home');
              }
            });
        }
      },
    );
    new GraphRequestManager().addRequest(infoRequest).start();
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
                  ref={(node) => {
                    this.loginInput = node;
                  }}
                  onFocus={() => this.loginInput.focus()}
                  placeholder="Email"
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
                  onFocus={() => this.passwordField.focus()}
                  style={login.input}
                  placeholder="Password"
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
                <TouchableOpacity style={login.btnfb} onPress={() => this.loginFacebook()}>
                  <Image source={images.logofb} style={login.logofb} />
                  <Text style={login.txtfb}> Continue With Facebook </Text>
                </TouchableOpacity>
              </View>
              <View style={login.textContainer}>
                <Text style={login.txtBottom}>Not account? Go to </Text>
                <TouchableOpacity
                  style={login.textSignUpContainer}
                  onPress={() => this.props.navigation.navigate('Signup')}
                >
                  <Text style={login.txtSignup}>Sign up</Text>
                </TouchableOpacity>
              </View>
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

export default connect(
  null,
  mapDispatchToProps,
)(Login);
