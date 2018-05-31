import React, { PureComponent } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';
import firebase from 'react-native-firebase';
import images from '../../themes/Images';
import styles from './style';

const defaultProps = {
  name: '',
  photoURL: images.defaultAvatar,
  gender: '',
  home: '',
};

class UpdateUser extends PureComponent {
  constructor(props) {
    super(props);
    this.state = defaultProps;
    if (props.user) {
      this.getUser(props.user);
    }
  }
  getUser = (user) => {
    console.log('getUser');
    firebase
      .database()
      .ref('/restaurant/user')
      .child(user.uid)
      .on('value', (data) => {
        this.setState(data._value);
      });
  };
  submit = () => {
    const user = this.props.navigation.getParam('user', {});
    console.log(user);
    const fullname = this.fullname._lastNativeText;
    const home = this.home._lastNativeText;
    const gender = this.gender._lastNativeText;
    const phone = this.phone._lastNativeText;
    const info = {
      email: user.email,
      fullname,
      home,
      gender,
      phone,
      photoURL: '',
    };
    firebase
      .database()
      .ref('restaurant/user')
      .child(user.uid)
      .set(info, (error) => {
        if (!error) {
          console.log(info);
          const navigateAction = NavigationActions.navigate({
            routeName: 'Home',
            action: NavigationActions.navigate({
              routeName: 'Home',
              params: {
                user: { ...info, uid: user.uid },
              },
            }),
          });
          this.props.navigation.dispatch(navigateAction);
        } else {
          console.log(error);
        }
      });
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.topView}>
          <Text style={styles.title}>Information</Text>
          <TouchableOpacity style={styles.imageView}>
            <Image source={this.state.photoURL} style={styles.image} />
          </TouchableOpacity>
        </View>
        <View style={styles.botView}>
          <TextInput
            ref={(node) => {
              this.fullname = node;
            }}
            style={styles.input}
            placeholder="Fullname"
            underlineColorAndroid="transparent"
            onSubmitEditing={() => this.gender.focus()}
          />
          <TextInput
            ref={(node) => {
              this.gender = node;
            }}
            style={styles.input}
            placeholder="Gender: Male or Female"
            underlineColorAndroid="transparent"
            onSubmitEditing={() => this.phone.focus()}
          />
          <TextInput
            ref={(node) => {
              this.phone = node;
            }}
            style={styles.input}
            keyboardType="phone-pad"
            placeholder="Phone"
            underlineColorAndroid="transparent"
            onSubmitEditing={() => this.home.focus()}
          />
          <TextInput
            ref={(node) => {
              this.home = node;
            }}
            style={styles.input}
            placeholder="Home: Hanoi, Vietnam"
            underlineColorAndroid="transparent"
            returnKeyType="done"
            onSubmitEditing={this.submit}
          />
          <TouchableOpacity onPress={this.submit} style={styles.btnSubmit}>
            <Text style={styles.txtSubmit}>SUBMIT</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

UpdateUser.propTypes = {
  user: PropTypes.bool,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
  }).isRequired,
};

UpdateUser.defaultProps = {
  user: false,
};

export default UpdateUser;
