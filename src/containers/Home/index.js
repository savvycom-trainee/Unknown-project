import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, ScrollView, TouchableOpacity, Image, FlatList, Modal } from 'react-native';
import { connect } from 'react-redux';
import Moment from 'moment';
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/Ionicons';
import StarRating from 'react-native-star-rating';
import { Header } from '../../components';
import styles from './styles';
import { Icons } from '../../themes';
import { fetchDatagetNewFeed } from '../../actions/getNewFeedAction';
import { getPositionSuccess, getPositionFail, setUser } from '../../actions';
import ModalView from './Modal';
import Loading from '../../components/LoadingContainer';

class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      modalVisible: false,
      error: null,
      // starCount: 2.5,
    };
  }

  componentDidMount() {
    this.onGetCurrentPosition();
    console.log(this.props.region);
    this.props.fetchDatagetNewFeed(this.props.user.user.uid);
    console.log(this.props.dataNewFeed.data);
    const { uid } = this.props.user.user;
    firebase.database().ref('root/users').child(uid).on('value', (data) => {
      this.props.setUser(data._value);
    });
  }

  onGetCurrentPosition = () => {
    // eslint-disable-next-line
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
        console.log(position);
        this.props.getPositionSuccess(position);
        this._updateLocation(position.coords.latitude, position.coords.longitude);
        console.log(`position ${JSON.stringify(this.props.getPositionSuccess(position))}`);
        console.log(`state: ${JSON.stringify(this.state)}`);
      },
      error => {
        this.setState({ error });
        this.props.getPositionFail();
      },
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
    );
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  hideModal = (message) => {
    this.setModalVisible(message);
  };
  _updateLocation = (lat, lng) => {
    const { uid } = this.props.user.user;
    console.log(this.props.user);

    const updates = {};
    updates[`/root/users/${uid}/location`] = { lat, lng };
    firebase
      .database()
      .ref()
      .update(updates, () => {
        const { user } = this.props.user;
        user.location = { lat, lng };
        this.props.setUser(user);
      });
  };
  /* eslint-disable */
  deg2rad = deg => deg * (Math.PI / 180);
  _getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = this.deg2rad(lat2 - lat1); // deg2rad below
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
    /* eslint-enable */
  };

  _renderNewFeed() {
    if (this.props.dataNewFeed.isFetching === true) {
      return <Loading />;
    }
    if (this.props.dataNewFeed.dataSuccess === true) {
      return (
        <FlatList
          data={this.props.dataNewFeed.data.reverse()}
          renderItem={({ item }) => (
            // const distance = this._getDistanceFromLatLonInKm(
            //   item.location.lat,
            //   item.location.lng,
            //   this.state.latitude,
            //   this.state.longitude,
            // );
            <View style={styles.formItem}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('HomeDetail', { data: item.restaurantPlaceId });
                }}
              >
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Account', { idUser: item.idUser })}>
                  <View style={styles.viewUserPost}>
                    <Image source={{ uri: item.userAvatar }} style={styles.viewImageUser} />
                    <View>
                      <Text style={styles.textNameUser}>{item.userName}</Text>
                      <Text style={styles.textPost}>
                        {Moment(item.create).format('h:mm a, Do MMMM YYYY')}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
                <View>
                  <View style={styles.statusContainer}>
                    <Text style={styles.statusStyle} numberOfLines={1} ellipsizeMode="tail">
                      {item.content.detail}
                    </Text>
                  </View>
                  <View style={styles.imageContent}>
                    <Image source={{ uri: item.content.photos[0] }} style={styles.imageContent} />
                  </View>
                  <View style={styles.viewPointForm}>
                    <View style={styles.viewPoint}>
                      <Text style={styles.textPoint}>{item.rating}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.formItemText}>
                  <View style={styles.viewNameRow1}>
                    <Text numberOfLines={1} style={styles.textName}>
                      {item.restaurantName}
                    </Text>
                  </View>
                  <View style={styles.viewNameRow2}>
                    <View>
                      <Text style={styles.textNameRow2} numberOfLines={1} ellipsizeMode="tail">
                        {item.restaurantVicinity}
                      </Text>
                    </View>
                    <View>
                      <StarRating
                        disabled={false}
                        emptyStar="ios-star-outline"
                        fullStar="ios-star"
                        iconSet="Ionicons"
                        maxStars={5}
                        rating={item.rating}
                        fullStarColor="#4CB33E"
                        reversed
                        starSize={12}
                      />
                    </View>
                  </View>
                  <View />
                </View>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      );
    }
    return null;
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.body}>
          <Header
            centerHeader={<Text style={{ fontSize: 15, fontWeight: '600' }}>NewFeed</Text>}
            leftHeader={<Text />}
            rightHeader={<Text />}
          />
          <Modal
            animationType="slide"
            transparent={false}
            onRequestClose={() => {}}
            visible={this.state.modalVisible}
          >
            <ModalView hideModal={this.hideModal} />
          </Modal>
          <ScrollView style={{ flex: 1 }}>
            <View style={styles.viewMenu}>
              <View style={styles.viewMenuItem}>
                <View style={[styles.itemMenu]}>
                  <TouchableOpacity
                    style={styles.itemMenuIcon}
                    onPress={() => {
                      this.setModalVisible(true);
                    }}
                  >
                    <Image source={Icons.add} />
                  </TouchableOpacity>
                </View>
                <View style={styles.itemMenu}>
                  <TouchableOpacity
                    style={styles.itemMenuIcon}
                    onPress={() => this.props.navigation.navigate('Account')}
                  >
                    <Icon name="md-contacts" size={20} color="#fff" />
                  </TouchableOpacity>
                </View>
                <View style={styles.itemMenu}>
                  <TouchableOpacity
                    style={styles.itemMenuIcon}
                    onPress={() => this.props.navigation.navigate('FindAround')}
                  >
                    <Icon name="ios-navigate" size={20} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.viewContent}>
              <View style={styles.viewContentForm}>{this._renderNewFeed()}</View>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  fetchDatagetNewFeed: PropTypes.func.isRequired,
  dataNewFeed: PropTypes.object.isRequired,
  user: PropTypes.object, //eslint-disable-line
  setUser: PropTypes.func, //eslint-disable-line
  getPositionSuccess: PropTypes.func, //eslint-disable-line
  getPositionFail: PropTypes.func, //eslint-disable-line
};
const mapStateToProps = state => ({
  dataNewFeed: state.getNewFeedReducers,
  region: state.getPositionReducers,
  user: state.user,
});

export default connect(
  mapStateToProps,
  { fetchDatagetNewFeed, getPositionSuccess, getPositionFail, setUser },
)(Home);
