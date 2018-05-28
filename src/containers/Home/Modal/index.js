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

import PropTypes from 'prop-types';
import StarRating from 'react-native-star-rating';
import { RNCamera } from 'react-native-camera';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import { Icons, Colors } from '../../../themes';
import { fetchDataGetAdd } from '../../../actions/getAddAction';
import ModalCustom from '../../../components/Modal';

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
      test: 0,
      starCount: 0.5,
      objPost: {
        name: '',
        detail: '',
        image: [],
        location: '',
        rating: 0,
      },
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
  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
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
  _onShowModal(a) {
    this.setState({ test: a });
    this.modal.open();
    this.props.fetchDataGetAdd();
  }

  render() {
    return (
      <View style={styles.container}>
        <ModalCustom onRef={ref => (this.modal = ref)}>
          <View style={{ flex: 1, width: null, backgroundColor: '#fff' }}>
            <View style={styles.viewHeadModal}>
              <Text style={styles.textHeadModal}>List Add</Text>
            </View>

            <View style={styles.bodyModal}>
              <View>
                <View>
                  <Text> Near Add You </Text>
                  <View style={styles.viewTextInputSearch}>
                    <TextInput
                      underlineColorAndroid="transparent"
                      placeholder="Detail"
                      style={styles.textInputSearch}
                      onChangeText={detail => this.setState({ detail })}
                      value={this.state.detail}
                    />
                  </View>
                </View>
                <View>
                  <FlatList
                    data={this.props.dataAdd.data}
                    renderItem={({ item }) => (
                      <View>
                        <Text>{item.name} </Text>
                      </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </View>
                <View>
                  <TouchableOpacity style={styles.viewButtonDone}>
                    <Text style={styles.textviewButtonDone}> Done</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ModalCustom>
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
                  <View style={styles.viewStarRating}>
                    <StarRating
                      disabled={false}
                      emptyStar="ios-star-outline"
                      fullStar="ios-star"
                      halfStar="ios-star-half"
                      iconSet="Ionicons"
                      maxStars={5}
                      rating={this.state.starCount}
                      selectedStar={rating => this.onStarRatingPress(rating)}
                      fullStarColor={Colors.white}
                    />
                  </View>
                  <View>
                    <TouchableOpacity
                      style={styles.butonCustomItem}
                      onPress={() => this._onShowModal(2)}
                    >
                      <Icon name="ios-navigate" color="white" size={33} />
                    </TouchableOpacity>
                  </View>
                  <View>
                    <TouchableOpacity style={styles.butonCustomItem}>
                      <Icon name="md-images" color="white" size={33} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}
ModalView.propTypes = {
  hideModal: PropTypes.func.isRequired,
  fetchDataGetAdd: PropTypes.func.isRequired,
  dataAdd: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  dataAdd: state.getAddReducers,
});
export default connect(mapStateToProps, { fetchDataGetAdd })(ModalView);
