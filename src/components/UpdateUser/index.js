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

const defaultPhotoURL = 'https://www.vccircle.com/wp-content/uploads/2017/03/default-profile.png';

class UpdateUser extends PureComponent {
  constructor(props) {
    super(props);
    const user = props.navigation.getParam('user', null);
    this.state = {
      ...user,
      isSubmit: false,
      isNewUser: true,
      photoURL: 'https://www.vccircle.com/wp-content/uploads/2017/03/default-profile.png',
    };
    if (!user) {
      this.getUser();
      this.setState({
        isNewUser: false,
        ...props.user,
      });
    }
  }

  uploadPhoto = (tmpInfo, url) => {
    const storage = firebase.storage();
    const sessionId = new Date().getTime();
    const imageRef = storage.ref('images').child(`${sessionId}`);
    console.log('uploadphoto');
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
    const user = this.state;
    const child = firebase
      .database()
      .ref('restaurant/user')
      .child(user.uid);
    if (!this.state.isNewUser) {
      child.update(info, (error) => {
        if (!error) {
          console.log(info);
          this.props.navigation.goBack();
        } else {
          console.log(error);
        }
      });
    } else {
      child.set(info, (error) => {
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
    }
  };
  submit = () => {
    const user = this.props.navigation.getParam('user', null);
    const fullname = this.fullname._lastNativeText;
    const home = this.home._lastNativeText;
    const gender = this.gender._lastNativeText;
    const phone = this.phone._lastNativeText;
    if (!(fullname === '' && home === '' && gender === '' && phone === '')) {
      const { photoURL } = this.state;
      const info = {
        email: user.email,
        fullname,
        home,
        gender,
        phone,
        photoURL: defaultPhotoURL,
      };
      if (photoURL !== defaultPhotoURL) {
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
          />
          <TouchableOpacity onPress={() => this.submit()} style={styles.btnSubmit}>
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
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(UpdateUser);
