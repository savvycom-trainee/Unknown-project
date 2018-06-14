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
  StatusBar,
  AsyncStorage,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import firebase from 'react-native-firebase';
import styles from './style';
import { Images, Icons } from '../../themes';
import Gallery from '../Gallery';
import CheckBox from '../CheckBox';
import Header from '../Header';
import { setUser } from '../../actions';

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
    this.user = this.props.navigation.getParam('user', null);
    this.type = this.props.navigation.getParam('fb', false);
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
  }

  componentDidMount() {
    // eslint-disable-next-line
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { coord } = position.coords;
        this.location = coord;
        console.log(this.location);
      },
      error => console.log(error),
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
    );
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
          console.log(info);
          console.log(this.user);
          this.uploadUser(info);
        }
      },
    );
  };

  uploadDone = (info, error) => {
    if (this.type) this.props.setUser({ ...info, uid: this.user.id });
    if (!error) {
      this.props.setUser(info);
      AsyncStorage.setItem('user', JSON.stringify(info));
      this.navigate();
    } else {
      console.log(error);
    }
  };

  uploadUser = (info) => {
    console.log(this.state.isNewUser);
    const ref = firebase
      .database()
      .ref('root/users')
      .child(this.user.uid ? this.user.uid : this.user.id);
    if (this.state.isNewUser) {
      ref.set(info, error => this.uploadDone(info, error));
    } else {
      ref.update(info, error => this.uploadDone(info, error));
    }
  };
  navigate = () => {
    let navigateAction = null;
    if (this.state.isNewUser) {
      navigateAction = NavigationActions.navigate({
        routeName: 'Home',
        action: NavigationActions.navigate({
          routeName: 'Home',
        }),
      });
    } else {
      navigateAction = NavigationActions.navigate({
        routeName: 'Account',
        action: NavigationActions.navigate({
          routeName: 'Account',
        }),
      });
    }

    this.props.navigation.dispatch(navigateAction);
  };
  submit = () => {
    const fullName = this.fullName._lastNativeText || this.user.fullName;
    const home = this.home._lastNativeText || this.user.home;
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
        location: this.location ? this.location.data : this.user.location,
        photoURL: this.user.photoURL ? this.user.photoURL : '',
        uid: this.user.uid ? this.user.uid : this.user.id,
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
        <StatusBar barStyle="dark-content" />
        <ScrollView style={{ flex: 1 }}>
          <Header
            centerHeader={<Text style={styles.title}>Information</Text>}
            leftHeader={!this.state.isNewUser ? <Image source={Icons.back} /> : null}
            onPressLeftHeader={!this.state.isNewUser ? this.navigate : null}
          />
          <View style={styles.topView}>
            <TouchableOpacity style={styles.imageView} onPress={() => this.gallery.open()}>
              <Image
                /* eslint-disable*/
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
        <Gallery
          select={this.selectAvatar}
          onRef={(node) => {
            this.gallery = node;
          }}
        />
      </View>
    );
  }
}

UpdateUser.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
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
