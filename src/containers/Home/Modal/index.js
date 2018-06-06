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
import { RNCamera } from 'react-native-camera';
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
      progressing: null,
      postdone: false,
      error: null,
      listadd: true,
      photos: [],
      keyword: '',
      photosselect: [],
      post: {
        content: {
          photos: [],
          detail: '',
        },
        created: '20/5/2018',
        idUser: 'fkFIKXHMFPSaCGerCXhirvZkF8D2',
        idRestaurant: 'idrestaurant123',
      },
      restaurant: {
        idRestaurant: 'idrestaurant123',
        geometry: {
          location: {
            lat: 21.065863,
            lng: 105.78003,
          },
        },
        photo: '',
        idUser: [],
        vicinity: '',
        rating: 0,
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
      restaurant: {
        ...this.state.restaurant,
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
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
            this.state.post.content.photos.indexOf(uploadedFile.downloadURL) === -1
          ) {
            console.log(this.state.post.content.photos.indexOf(uploadedFile.downloadURL) === -1);
            const timeadd = new Date().toLocaleString();
            this.setState({
              post: {
                ...this.state.post,
                created: timeadd,
                content: {
                  photos: this.state.post.content.photos.concat(uploadedFile.downloadURL),
                },
              },
            });
            console.log(this.state.post.content.photos, `${i} ${file.length}`);
            if (this.state.post.content.photos.length === file.length) {
              const { post, restaurant } = this.state;
              this.props.fetchPostNewFeed(post, restaurant);
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
      restaurant: {
        ...this.state.restaurant,
        idRestaurant: item.id,
        geometry: {
          location: {
            lat: item.geometry.location.lat,
            lng: item.geometry.location.lng,
          },
        },
        name: item.name,
        vicinity: item.vicinity,
        idUser: 'fkFIKXHMFPSaCGerCXhirvZkF8D2',
      },
      post: {
        ...this.state.post,
        idRestaurant: item.id,
        idUser: 'fkFIKXHMFPSaCGerCXhirvZkF8D2sss',
      },
    });
  }
  _onPost() {
    if (!this._validateNameLocal()) {
      if (!this._validateInputDetail()) {
        if (!this._validateRating()) {
          if (!this._validateImages()) {
            const { post, restaurant } = this.state;
            this.props.fetchPostNewFeed(post, restaurant);
            // if (this._onUploadPhoto()) {
            //   // this._onUploadPhoto().then(res=>console.log('hihi',res));
            //   // this.props.fetchPostNewFeed(this.state.test);
            // }
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
    if (this.state.restaurant.rating === 0) {
      return true;
    }
    return false;
  }
  _validateInputDetail() {
    if (this.state.post.content.detail === '') {
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
    if (this.state.restaurant.name === '') {
      return true;
    }
    return false;
  }
  // _clearName(){
  //   this.setState({ ...this.state.test,
  //   name: '',
  //   });
  // }
  _onShowModal() {
    const { latitude, longitude } = this.state;
    this.modal.open();
    this.props.fetchDataGetAdd(latitude, longitude);
  }
  _onSearch() {
    const { latitude, longitude, keyword } = this.state;
    if (!this._validateSearch()) {
      this.props.fetchDataGetAddSearch(latitude, longitude, keyword);
      this.setState({ listadd: false });
    } else {
      Alert.alert('Mày Nhập hộ tao cái ');
    }
  }
  _onCloserModal() {
    this.setState({ listadd: true });
    this.modal.close();
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
                    <Text style={styles.textSelected}>{this.state.restaurant.name}</Text>
                    <Text style={styles.textSelectedAdd}>{this.state.restaurant.vicinity}</Text>
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
              <TouchableOpacity>
                <Text style={styles.textCreatePost}>Create post</Text>
              </TouchableOpacity>
            </View>
            <View>
              {this.state.postdone ? (
                <TouchableOpacity onPress={() => this._onPost()}>
                  <Text style={styles.textPosted}>Post</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => this._onPost()}>
                  <Text style={styles.textPost}>Post</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View style={styles.viewContent}>
            {/* <ScrollView style={{ flex: 1 }}> */}
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
                        {this.state.restaurant.name}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <TouchableOpacity style={styles.viewFormAddSelected}>
                      <Icon name="md-locate" color={Colors.text} size={16} />
                      <Text numberOfLines={1} style={styles.textSelectedShow}>
                        {this.state.restaurant.vicinity}
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
                  {/* <View style={styles.viewTextInput}>
                <TextInput
                  returnKeyType="next"
                  underlineColorAndroid="transparent"
                  placeholder="Name"
                  style={styles.textInput}
                  onChangeText={name => this.setState({ name })}
                  value={this.state.name}
                />
              </View> */}
                  <View style={styles.viewTextInput}>
                    <TextInput
                      underlineColorAndroid="transparent"
                      placeholder="What review about?"
                      style={styles.textInput}
                      onChangeText={text =>
                        this.setState({
                          post: {
                            ...this.state.post,
                            content: {
                              ...this.state.post.content,
                              detail: text,
                            },
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
            {/* </ScrollView> */}
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
                  rating={this.state.restaurant.rating}
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
                  <Icon name="ios-list" color="white" size={33} />
                </TouchableOpacity>
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
  dataSuccess: PropTypes.bool, // eslint-disable-line
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
