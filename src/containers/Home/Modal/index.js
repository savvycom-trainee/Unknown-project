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
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import { Icons } from '../../../themes';
import { fetchDataGetAdd } from '../../../actions/getAddAction';
// const iosConfig = {};
// const androidConfig = {};
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
  }
  _handleButtonPress = () => {
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
            <Text style={styles.textPost}>Post</Text>
          </View>
          <View />
        </View>
        <View style={styles.viewContent}>
          <ScrollView>
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
              <View>
                <View style={styles.viewOption}>
                  <View style={styles.viewItemOption}>
                    <TouchableOpacity onPress={() => this.props.fetchDataGetAdd()}>
                      <Icon name="ios-compass" size={25} color="#fff" />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.viewItemOption}>
                    <TouchableOpacity onPress={() => this._handleButtonPress()}>
                      <Icon name="md-image" size={25} color="#fff" />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.viewItemOption}>
                    <Icon name="ios-camera" size={25} color="#fff" />
                  </View>
                </View>
                <TouchableOpacity style={styles.viewButton} onPress={() => this._onPost()}>
                  <Text style={styles.textButtonPost}>Post</Text>
                </TouchableOpacity>
                <View style={styles.viewItemImages}>
                  <Text> Check in</Text>
                  <Text>{this.state.latitude}</Text>
                  <Text>{this.state.longitude}</Text>
                  <FlatList
                    data={this.props.dataAdd.data}
                    renderItem={({ item }) => (
                      <View>
                        <Text>Bạn đang gần </Text>
                        <Text>{item.name} </Text>
                      </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                  />
                  <FlatList
                    horizontal
                    data={this.state.photos}
                    renderItem={({ item }) => (
                      <Image
                        style={{
                          width: 84,
                          height: 84,
                        }}
                        source={{ uri: item.node.image.uri }}
                      />
                    )}
                    keyExtractor={(item, index) => index.toString()}
                  />
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
