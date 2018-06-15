import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import styles from './style';
import { Icons } from '../../themes';
import Header from '../Header';

class ResetPassword extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }
  close = () => {
    this.props.navigation.goBack();
  };
  submit = () => {
    const { email } = this.props.user.user;
    const oldPassword = this.curPass._lastNativeText;
    const newPass = this.newPass._lastNativeText;
    const comfirmNewPass = this.comfirmPass._lastNativeText;
    if (oldPassword !== '' && newPass !== '' && comfirmNewPass !== '') {
      if (newPass === comfirmNewPass) {
        this.setState(
          {
            isLoading: true,
          },
          () => {
            firebase
              .auth()
              .signInAndRetrieveDataWithEmailAndPassword(email, oldPassword)
              .then(() => {
                firebase
                  .auth()
                  .currentUser.updatePassword(newPass)
                  .then(() => {
                    this.setState(
                      {
                        isLoading: false,
                      },
                      () => {
                        Alert.alert('Error', 'Change success', [
                          {
                            text: 'OK',
                            onPress: this.close,
                          },
                        ]);
                      },
                    );
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              })
              .catch(() => {
                this.setState(
                  {
                    isLoading: false,
                  },
                  () => {
                    Alert.alert('Error', 'Current Password incorrect', [
                      {
                        text: 'OK',
                        onPress: () => this.curPass.focus(),
                      },
                    ]);
                  },
                );
              });
          },
        );
      } else {
        Alert.alert('Error', 'Comfirm Password incorrect', [
          {
            text: 'OK',
          },
        ]);
      }
    } else {
      Alert.alert('Error', 'Enter full input, Please!', [
        {
          text: 'OK',
        },
      ]);
    }
  };
  render() {
    return (
      <View style={this.props.style}>
        <Header
          leftHeader={<Image source={Icons.back} />}
          onPressLeftHeader={this.close}
          centerHeader="Change Password"
        />
        <View style={styles.botView}>
          <TextInput
            ref={(node) => {
              this.curPass = node;
            }}
            onFocus={() => this.curPass.focus()}
            placeholder="Current password"
            secureTextEntry
            selectTextOnFocus
            style={styles.input}
            onSubmitEditing={this.currentSubmit}
          />
          <TextInput
            ref={(node) => {
              this.newPass = node;
            }}
            secureTextEntry
            selectTextOnFocus
            onFocus={() => this.newPass.focus()}
            placeholder="New password"
            style={styles.input}
          />
          <TextInput
            ref={(node) => {
              this.comfirmPass = node;
            }}
            secureTextEntry
            selectTextOnFocus
            onFocus={() => this.comfirmPass.focus()}
            placeholder="Comfirm new password"
            style={styles.input}
          />
          <TouchableOpacity style={styles.btnLogin} onPress={this.submit}>
            {!this.state.isLoading ? (
              <Text style={styles.txtBtn}> CHANGE </Text>
            ) : (
              <ActivityIndicator size="small" color="white" />
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

ResetPassword.propTypes = {
  style: PropTypes.any, //eslint-disable-line
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  user: PropTypes.object.isRequired,
};

ResetPassword.defaultProps = {
  style: styles.container,
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(ResetPassword);
