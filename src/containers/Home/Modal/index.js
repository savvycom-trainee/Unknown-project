import React, { PureComponent } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  CameraRoll,
  ScrollView,
  FlatList,
  Keyboard,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import { Icons } from '../../../themes';
import { fetchDataGetAdd } from '../../../actions/getAddAction';
import { green } from 'ansi-colors';
// const iosConfig = {};
// const androidConfig = {};
const PendingView = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'lightgreen',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Text>Waiting</Text>
  </View>
);

class ModalView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      detail: '',
      name: '',
      photos: [],
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
    this._getPhoto();
  }
  takePicture = async function (camera) {
    const options = { quality: 0.5, base64: true };
    const data = await camera.takePictureAsync(options);
    //  eslint-disable-next-line
    console.log(data.uri);
  };
  _getPhoto = () => {
    CameraRoll.getPhotos({
      first: 20,
      assetType: 'Photos',
    })
      .then((r) => {
        this.setState({ photos: r.edges });
        console.log(this.state.photos);
      })
      .catch((err) => {
        // Error Loading Images
      });
  };
  _getAdd() {}
  // _validateonPost() {
  //   // const {
  //   //   name, detail, latitude, longitude,
  //   // } = this.state;
  //   // if (name || detail === '') {
  //   //   Alert.alert('Name null or Detail');
  //   //   return false;
  //   // }
  //   // if (latitude || longitude == null) {
  //   //   Alert.alert('Not get Local');
  //   //   return false;
  //   // }
  //   return true;
  // }
  _onPost() {
    if (this._validateonPost()) {
      Keyboard.dismiss();
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.viewHead}>
          <View>
            <TouchableOpacity
              onPress={() => {
                this.props.hideModal(false);
              }}
            >
              <Image source={Icons.close} style={styles.imgClose} />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity>
              <Text style={styles.textCreatePost}>Create post</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity>
              <Text style={styles.textPost}>Post</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.viewContent}>
          <ScrollView style={{ flex: 1 }}>
            <View style={styles.Form}>
              <View style={styles.viewform}>
                <View style={styles.viewTextInput}>
                  <TextInput
                    returnKeyType="next"
                    underlineColorAndroid="transparent"
                    placeholder="Name"
                    style={styles.textInput}
                    onChangeText={name => this.setState({ name })}
                    value={this.state.name}
                  />
                </View>
                <View style={styles.viewTextInput}>
                  <TextInput
                    underlineColorAndroid="transparent"
                    placeholder="Detail"
                    style={styles.textInput}
                    onChangeText={detail => this.setState({ detail })}
                    value={this.state.detail}
                  />
                </View>
                <View style={styles.viewImage}>
                  <View style={styles.viewCamera}>
                    <RNCamera
                      style={styles.preview}
                      type={RNCamera.Constants.Type.back}
                      flashMode={RNCamera.Constants.FlashMode.on}
                      permissionDialogTitle="Permission to use camera"
                      permissionDialogMessage="We need your permission to use your camera phone"
                    >
                      {({ camera, status }) => {
                        if (status !== 'READY') return <PendingView />;
                        return (
                          <View style={styles.camera}>
                            <TouchableOpacity style={styles.capture}>
                              <Icon name="ios-reverse-camera-outline" color="white" size={33} />
                            </TouchableOpacity>
                            <TouchableOpacity
                              onPress={() => this.takePicture(camera)}
                              style={styles.capture}
                            >
                              <Icon name="ios-camera" color="white" size={50} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.capture}>
                              <Icon name="ios-flash" color="white" size={33} />
                            </TouchableOpacity>
                          </View>
                        );
                      }}
                    </RNCamera>
                  </View>
                  <View style={styles.viewPhotoMobile}>
                    <ScrollView>
                      <View style={styles.viewMenuItem}>
                        {this.state.photos.map((p, i) => (
                          <TouchableOpacity key={i}>
                            <Image
                              key={i}
                              style={styles.imagePhotoItem}
                              source={{ uri: p.node.image.uri }}
                            />
                          </TouchableOpacity>
                        ))}
                      </View>
                    </ScrollView>
                  </View>
                </View>
              </View>

              <View style={styles.viewCustom}>
                <View>
                  <Text style={styles.textAddPost}>Add post</Text>
                </View>
                <View style={styles.viewCustomItem}>
                  <TouchableOpacity style={styles.butonCustomItem}>
                    <Icon name="ios-navigate" color="white" size={33} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.butonCustomItem}>
                    <Icon name="md-images" color="white" size={33} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  dataAdd: state.getAddReducers,
});
export default connect(mapStateToProps, { fetchDataGetAdd })(ModalView);
