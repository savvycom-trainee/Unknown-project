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
import { NavigationActions } from 'react-navigation';
import firebase from 'react-native-firebase';
import styles from './style';
import Gallery from '../Gallery';
import { setUser } from '../../actions';

const defaultProps = {
  name: '',
  photoURL: 'https://www.vccircle.com/wp-content/uploads/2017/03/default-profile.png',
  gender: '',
  home: '',
};

class UpdateUser extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // ...defaultProps,
      isSubmit: false,
    };
    this.user = this.props.navigation.getParam('user', {});
    if (!this.user) {
      this.getUser();
    }
  }

  componentDidMount() {
    console.log('user', this.user.uid);
  }

  getUser = () => {
    const { uid } = this.user;
    firebase
      .database()
      .ref('/root/users')
      .child(uid)
      .on('value', data =>
        this.setState({
          ...data._value,
          uid,
        }));
  };

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
  uploadUser = (info) => {
    // const user = this.state;
    const userFb = this.props.navigation.getParam('user', {});
    const type = this.props.navigation.getParam('fb', false);
    const user = this.state;
    firebase
      .database()
      .ref('root/users')
      .child(type ? userFb.id : user.uid)
      .set(info, (error) => {
        if (!error) {
          console.log(info);
          // eslint-disable-next-line
          this.props.setUser(info);
          const navigateAction = NavigationActions.navigate({
            routeName: 'Home',
            action: NavigationActions.navigate({
              routeName: 'Home',
              params: {
                user: { ...info, uid: this.user.uid },
              },
            }),
          });
          this.props.navigation.dispatch(navigateAction);
        } else {
          console.log(error);
        }
      });
  };
  submit = () => {
    const user = this.props.navigation.getParam('user', {});
    const fullName = user.name ? user.name : this.fullName._lastNativeText;
    const home = this.home._lastNativeText;
    const gender = this.gender._lastNativeText;
    const phone = this.phone._lastNativeText;
    if (!(fullName === '' && home === '' && gender === '' && phone === '')) {
      const { photoURL } = this.state;
      const info = {
        email: this.user.email,
        fullName,
        home,
        gender,
        phone,
        photoURL: defaultProps.photoURL,
      };

      if (photoURL !== defaultProps.photoURL) {
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
    const user = this.props.navigation.getParam('user', {});
    return (
      <ScrollView style={styles.container}>
        <Gallery
          select={this.selectAvatar}
          onRef={(node) => {
            this.gallery = node;
          }}
        />
        <View style={styles.topView}>
          <Text style={styles.title}>Information</Text>
          <TouchableOpacity style={styles.imageView} onPress={() => this.gallery.open()}>
            <Image source={{ uri: this.state.photoURL }} style={styles.image} />
          </TouchableOpacity>
        </View>
        <View style={styles.botView}>
          <TextInput
            ref={(node) => {
              this.fullName = node;
            }}
            value={user.name}
            style={styles.input}
            placeholder="Full name"
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
    );
  }
}

UpdateUser.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
  }).isRequired,
};
const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch(setUser(user)),
});
const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUser);
