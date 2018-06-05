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
  Alert,
} from 'react-native';
import firebase from 'react-native-firebase';
import PropTypes from 'prop-types';
import StarRating from 'react-native-star-rating';
import { connect } from 'react-redux';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import { Icons, Colors, Images } from '../../../themes';
import {
  fetchDataGetAdd,
  fetchPostNewFeed,
  getPositionSuccess,
  fetchDataGetAddSearch,
} from '../../../actions';
import ModalCustom from '../../../components/Modal';
import Loading from '../../../components/LoadingContainer';

class ModalView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      progressing: null,
      postdone: false,
      error: null,
      listadd: true,
      photos: [],
      keyword: '',
      photosselect: [],
      test: {
        idrestaurant: 'idrestaurant123',
        name: 'Hanoi Pho',
        rating: 0,
        type: 'Fast Food',
        detail: '',
        createtime: '',
        photos: [],
        timeopen: '7h00',
        timeclose: '22h00',
        menu: [
          {
            namemenu: 'Salads',
            imagemenu: 'https://c1.staticflickr.com/9/8345/8233271770_70ee15d73a_b.jpg',
            detailmenu: 'Mon nay an nhu shit',
            pricemenu: 12.6,
          },
        ],
        geometry: {
          location: {
            lat: 21.065863,
            lng: 105.78003,
          },
        },
        review: [
          {
            iduser: 'fkFIKXHMFPSaCGerCXhirvZkF8D2',
            comment: 'Nhà hàng như shit',
            rating: 4,
            image: [
              'https://c1.staticflickr.com/9/8345/8233271770_70ee15d73a_b.jpg',
              'https://c1.staticflickr.com/9/8345/8233271770_70ee15d73a_b.jpg',
            ],
            timeadd: '',
          },
        ],
        iduser: 'fkFIKXHMFPSaCGerCXhirvZkF8D2',
        vicinity: '69 TDH',
      },
    };
  }

  componentDidMount() {
    this.onGetCurrentLocation();
    this._getPhoto();
  }

  onGetCurrentLocation = () => {
    this.setState({
      latitude: this.props.region.coords.latitude, // eslint-disable-line
      longitude: this.props.region.coords.longitude, // eslint-disable-line
    });
  };

  onStarRatingPress(rating) {
    this.setState({
      test: {
        ...this.state.test,
        rating,
      },
    });
  }
  takePicture = async function (camera) {
    const options = { quality: 0.5, base64: true };
    const data = await camera.takePictureAsync(options);
    //  eslint-disable-next-line
    // console.log(data.uri);
  };
  _getPhoto = () => {
    CameraRoll.getPhotos({
      first: 1000,
      assetType: 'Photos',
    })
      .then((r) => {
        this.setState({ photos: r.edges });
        // console.log(this.state.photos);
      })
      .catch((err) => {
        console.log(err);
        // Error Loading Images
      });
  };
  _onUploadPhoto = () => {
    const file = this.state.photosselect;
    const storage = firebase.storage();
    const sessionId = new Date().getTime();
    const imageRef = storage.ref('images').child(`${sessionId}`);
    for (let i = 0; i < file.length; i++) {
      imageRef.putFile(file[i]).on(
        'state_changed',
        (snapshot) => {
          const progress = snapshot.bytesTransferred / snapshot.totalBytes * 100;
          this.setState({ progressing: progress });
          // console.log(`Upload is ${progress}% done`);
          // Current upload state
        },
        (err) => {
          console.log(err);
          return false;
        },
        (uploadedFile) => {
          // return true;
          if (
            uploadedFile.state === 'success' &&
            this.state.test.photos.indexOf(uploadedFile.downloadURL) === -1
          ) {
            console.log(this.state.test.photos.indexOf(uploadedFile.downloadURL) === -1);
            const timeadd = new Date().toLocaleString();
            this.setState({
              test: {
                ...this.state.test,
                createtime: timeadd,
                photos: this.state.test.photos.concat(uploadedFile.downloadURL),
              },
            });
            console.log(this.state.test.photos, `${i} ${file.length}`);
            if (this.state.test.photos.length === file.length) {
              this.props.fetchPostNewFeed(this.state.test);
              if (this.props.dataPost.dataSuccess === true) {
                this.props.hideModal(false);
              }
            }
            return true;
          }
          return false;
        },
      );
    }
  };

  _onAddImages(a) {
    // console.log(a);
    this.setState({
      photosselect: this.state.photosselect.concat(a),
    });
    if (this.state.photosselect.length >= 5) {
      Alert.alert('thêm ít thôi');
    }
    // console.log(this.state.test.photos);
  }
  _onAdd(item) {
    this.setState({
      test: {
        ...this.state.test,
        idrestaurant: item.id,
        geometry: {
          location: {
            lat: item.geometry.location.lat,
            lng: item.geometry.location.lng,
          },
        },
        name: item.name,
        vicinity: item.vicinity,
        iduser: '0hJcq7PHg5bXgB414nqBXl3teAg2',
      },
    });
  }
  _onPost() {
    if (!this._validateNameLocal()) {
      if (!this._validateInputDetail()) {
        if (!this._validateRating()) {
          if (!this._validateImages()) {
            if (this._onUploadPhoto()) {
              // this._onUploadPhoto().then(res=>console.log('hihi',res));
              // this.props.fetchPostNewFeed(this.state.test);
            }
          } else {
            Alert.alert('Mày chọn tối thiểu 3 ảnh hộ tao cái');
          }
        } else {
          Alert.alert('Mày đánh giá hộ tao cái');
        }
      } else {
        Alert.alert('Mày đánh điền Detail hộ tao cái ');
      }
    } else {
      Alert.alert('Mày Checkin hộ tao cái ');
    }
  }
  _validateImages() {
    if (this.state.photosselect.length === 0) {
      return true;
    }
    return false;
  }
  _validateRating() {
    if (this.state.test.rating === 0) {
      return true;
    }
    return false;
  }
  _validateInputDetail() {
    if (this.state.test.detail === '') {
      return true;
    }

    return false;
  }
  _validateSearch() {
    if (this.state.keyword === '') {
      return true;
    }

    return false;
  }
  _validateNameLocal() {
    if (this.state.test.name === '') {
      return true;
    }
    return false;
  }
  _onShowModal() {
    const { latitude, longitude } = this.state;
    this.modal.open();
    this.props.fetchDataGetAdd(latitude, longitude);
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.body}>
          <ModalCustom onRef={ref => (this.modal = ref)}>
            <View style={{ flex: 1, width: null, backgroundColor: '#fff' }}>
              <View style={styles.viewHeadModal}>
                <Text style={styles.textHeadModal}>List Add</Text>
              </View>
              <View style={styles.bodyModal}>
                <View>
                  <View style={styles.ViewHeadFlatList}>
                    <View style={styles.viewTextHead}>
                      <Text style={styles.textHeadNear}> Near Add You </Text>
                    </View>
                    <View style={styles.viewFromSearch}>
                      <View style={styles.viewTextInputSearch}>
                        <TextInput
                          underlineColorAndroid="transparent"
                          placeholder="Search"
                          style={styles.textInputSearch}
                          value={this.state.test.search}
                          onChangeText={text => this.setState({ keyword: text })}
                        />
                      </View>
                      <View style={styles.ViewButtonSearch}>
                        <TouchableOpacity
                          style={styles.buttonSearch}
                          onPress={() => this._onSearch()}
                        >
                          <Icon name="md-search" color={Colors.default} size={38} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                  {this.state.listadd ? (
                    <View style={styles.ViewContentFlatList}>
                      {this.props.dataAdd.isFetching ? (
                        <Loading />
                      ) : (
                        <FlatList
                          data={this.props.dataAdd.data}
                          renderItem={({ item }) => (
                            <View style={styles.ViewItemFlatList}>
                              <TouchableOpacity onPress={() => this._onAdd(item)}>
                                <View style={styles.viewItemAdd}>
                                  <View>
                                    <Text style={styles.textItemName}>{item.name} </Text>
                                  </View>
                                  <View>
                                    <Image
                                      source={{ uri: item.icon }}
                                      style={{ height: 20, width: 20 }}
                                    />
                                  </View>
                                </View>
                              </TouchableOpacity>
                            </View>
                          )}
                          keyExtractor={(item, index) => index.toString()}
                        />
                      )}
                    </View>
                  ) : (
                    <View style={styles.ViewContentFlatList}>
                      {this.props.dataSearchAdd.isFetching ? (
                        <Loading />
                      ) : (
                        <FlatList
                          data={this.props.dataSearchAdd.data}
                          renderItem={({ item }) => (
                            <View style={styles.ViewItemFlatList}>
                              <TouchableOpacity onPress={() => this._onAdd(item)}>
                                <View style={styles.viewItemAdd}>
                                  <View>
                                    <Text style={styles.textItemName}>{item.name} </Text>
                                  </View>
                                  <View>
                                    <Image
                                      source={{ uri: item.icon }}
                                      style={{ height: 20, width: 20 }}
                                    />
                                  </View>
                                </View>
                              </TouchableOpacity>
                            </View>
                          )}
                          keyExtractor={(item, index) => index.toString()}
                        />
                      )}
                    </View>
                  )}

                  <View style={styles.ViewButton}>
                    <Text style={styles.textSelected}>{this.state.test.name}</Text>
                    <Text style={styles.textSelectedAdd}>{this.state.test.vicinity}</Text>
                    <TouchableOpacity
                      style={styles.viewButtonDone}
                      onPress={() => this._onCloserModal()}
                    >
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
              <Text style={styles.textCreatePost}>Create post</Text>
            </View>
            <View>
              <TouchableOpacity onPress={() => this._onPost()}>
                <Text style={this.state.postdone ? styles.textPosted : styles.textPost}>Post</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.viewContent}>
            <View style={styles.Form}>
              <View style={styles.viewform}>
                <View style={styles.viewInfoDetail}>
                  <View style={styles.viewFormImageUser}>
                    <Image source={Images.restaurantPhoto} style={styles.ImageAvatar} />
                  </View>
                  <View>
                    <TouchableOpacity style={styles.viewFormAddSelected}>
                      <Icon name="ios-home" color={Colors.text} size={16} />
                      <Text numberOfLines={1} style={styles.textSelectedShow}>
                        {this.state.test.name}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <TouchableOpacity style={styles.viewFormAddSelected}>
                      <Icon name="md-locate" color={Colors.text} size={16} />
                      <Text numberOfLines={1} style={styles.textSelectedShow}>
                        {this.state.test.vicinity}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ paddingLeft: 10 }}>
                    <Progress.Pie
                      progress={this.state.progressing}
                      size={25}
                      color={Colors.default}
                    />
                  </View>
                </View>
                <View style={styles.viewFormInput}>
                  <View style={styles.viewTextInput}>
                    <TextInput
                      underlineColorAndroid="transparent"
                      placeholder="What review about?"
                      style={styles.textInput}
                      onChangeText={text =>
                        this.setState({
                          test: {
                            ...this.state.test,
                            detail: text,
                          },
                        })
                      }
                    />
                  </View>
                </View>
                <View style={styles.viewImageSelected}>
                  <ScrollView horizontal>
                    <View style={styles.viewImageSelectedItem}>
                      {this.state.photosselect.map((p, i) => (
                        <TouchableOpacity key={i}>
                          <Image
                            key={i}
                            style={styles.imagePhotoSelectedItem}
                            source={{ uri: p }}
                          />
                        </TouchableOpacity>
                      ))}
                    </View>
                  </ScrollView>
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
                          <TouchableOpacity
                            key={i}
                            onPress={() => this._onAddImages(p.node.image.uri)}
                          >
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
                  emptyStarColor={Colors.white}
                  emptyStar="ios-star-outline"
                  fullStar="ios-star"
                  halfStar="ios-star-half"
                  iconSet="Ionicons"
                  maxStars={5}
                  rating={this.state.test.rating}
                  selectedStar={rating => this.onStarRatingPress(rating)}
                  fullStarColor={Colors.white}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
ModalView.propTypes = {
  hideModal: PropTypes.func.isRequired,
  fetchDataGetAdd: PropTypes.func.isRequired,
  fetchPostNewFeed: PropTypes.func.isRequired,
  fetchDataGetAddSearch: PropTypes.func.isRequired,
  dataAdd: PropTypes.object.isRequired,
  dataPost: PropTypes.object.isRequired,
  dataSearchAdd: PropTypes.object.isRequired,
  dataSuccess: PropTypes.bool,  // eslint-disable-line
  // progress: PropTypes.string.isRequired,  // eslint-disable-line
};
const mapStateToProps = state => ({
  dataAdd: state.getAddReducers,
  dataPost: state.postNewFeedReducers,
  region: state.getPositionReducers,
  dataSearchAdd: state.getAddSearchReducers,
});
export default connect(
  mapStateToProps,
  {
    fetchDataGetAdd,
    fetchPostNewFeed,
    getPositionSuccess,
    fetchDataGetAddSearch,
  },
)(ModalView);
