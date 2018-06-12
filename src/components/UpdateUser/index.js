import React, { PureComponent } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationActions } from 'react-navigation';
import firebase from 'react-native-firebase';
import styles from './style';
import { Images } from '../../themes';
import Gallery from '../Gallery';
import CheckBox from '../CheckBox';
import { setUser, getPositionUser } from '../../actions';

const data = [
  {
    text: 'Male',
    value: 'Male',
  },
  {
    text: 'Female',
    value: 'Female',
  },
];

class UpdateUser extends PureComponent {
  constructor(props) {
    super(props);
    this.user = this.props.navigation.getParam('newUser', false);
    if (!this.user) {
      this.user = this.props.user.user;
      this.state = {
        isSubmit: false,
        photoURL: '',
      };
    } else {
      this.state = {
        isSubmit: false,
        photoURL: '',
        isNewUser: true,
      };
    }
    console.log(this.user);
    this.genderValue = 'Male';
    this.location = getPositionUser();
    console.log('position', this.location);
  }

  componentDidMount() {
    console.log('user', this.user.uid);
  }

  uploadPhoto = (tmpInfo, url) => {
    const storage = firebase.storage();
    const sessionId = new Date().getTime();
    const imageRef = storage.ref('images').child(`${sessionId}`);
    imageRef.putFile(url).on(
      'state_changed',
      () => {
        this.setState({
          isSubmit: true,
        });
      },
      (err) => {
        console.log(err);
        this.setState({
          isSubmit: false,
        });
      },
      (uploadedFile) => {
        if (uploadedFile.state === 'success') {
          this.setState({
            isSubmit: false,
          });
          let info = tmpInfo;
          info = {
            ...info,
            photoURL: uploadedFile.downloadURL,
          };
          this.uploadUser(info);
        }
      },
    );
  };

  uploadDone = (info, error) => {
    if (!error) {
      this.props.setUser(info);
      // eslint-disable-next-line
      const navigateAction = NavigationActions.navigate({
        routeName: 'Home',
        action: NavigationActions.navigate({
          routeName: 'Home',
        }),
      });
      this.props.navigation.dispatch(navigateAction);
    } else {
      console.log(error);
    }
  };

  uploadUser = (info) => {
    if (this.state.isNewUser) {
      firebase
        .database()
        .ref('root/users')
        .child(this.user.uid)
        .set(info, error => this.uploadDone(info, error));
    } else {
      firebase
        .database()
        .ref('root/users')
        .child(this.user.uid)
        .update(info, error => this.uploadDone(info, error));
    }
  };
  submit = () => {
    const fullName = this.fullName.lastNativeText || this.user.fullName;
    const home = this.home.lastNativeText || this.user.home;
    const gender = this.genderValue || this.user.gender;
    const phone = this.phone._lastNativeText || this.user.phone;
    if (!(fullName === '' && home === '' && gender === '' && phone === '')) {
      const { photoURL } = this.state;
      const info = {
        email: this.user.email,
        fullName,
        home,
        gender,
        phone,
        location: this.location ? this.location.data : [],
        photoURL: this.user.photoURL ? this.user.photoURL : '',
        uid: this.user.uid,
      };
      if (photoURL !== '') {
        this.uploadPhoto(info, photoURL);
      } else {
        this.uploadUser(info);
      }
    } else {
      Alert.alert('Please enter full information');
    }
  };
  selectAvatar = (uri) => {
    this.setState(
      {
        photoURL: uri,
      },
      () => {
        this.gallery.close();
      },
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <Gallery
          select={this.selectAvatar}
          onRef={(node) => {
            this.gallery = node;
          }}
        />
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.topView}>
            <Text style={styles.title}>Information</Text>
            {!this.state.isNewUser ? (
              <TouchableOpacity style={styles.editPassword}>
                <Icon name="wrench" size={26} />
              </TouchableOpacity>
            ) : null}

            <TouchableOpacity style={styles.imageView} onPress={() => this.gallery.open()}>
              <Image
              /* eslint-disable */
                source={
                  this.state.photoURL === ''
                    ? this.user.photoURL
                      ? { uri: this.user.photoURL }
                      : Images.defaultAvatar
                    : { uri: this.state.photoURL }
                }
                 /* eslint-enable */
                style={styles.image}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.botView}>
            <TextInput
              ref={(node) => {
                this.fullName = node;
              }}
              defaultValue={this.user.fullName ? this.user.fullName : ''}
              style={styles.input}
              placeholder="Full name"
              underlineColorAndroid="transparent"
            />
            <CheckBox
              style={styles.checkBox}
              data={data}
              defaultValue={this.user.gender}
              onChange={(value) => {
                this.genderValue = value;
              }}
            />
            <TextInput
              ref={(node) => {
                this.phone = node;
              }}
              style={styles.input}
              keyboardType="phone-pad"
              placeholder="Phone"
              defaultValue={this.user.phone ? this.user.phone : ''}
              underlineColorAndroid="transparent"
              returnKeyType="next"
              onSubmitEditing={() => this.home.focus()}
            />
            <TextInput
              ref={(node) => {
                this.home = node;
              }}
              style={styles.input}
              defaultValue={this.user.home ? this.user.home : ''}
              placeholder="Home: Hanoi, Vietnam"
              underlineColorAndroid="transparent"
              returnKeyType="done"
            />
            <TouchableOpacity onPress={this.submit} style={styles.btnSubmit}>
              {!this.state.isSubmit ? (
                <Text style={styles.txtSubmit}>SUBMIT</Text>
              ) : (
                <ActivityIndicator size="small" color="white" />
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

UpdateUser.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
  }).isRequired,
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
};
const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch(setUser(user)),
});
const mapStateToProps = state => ({
  user: state.user,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UpdateUser);
