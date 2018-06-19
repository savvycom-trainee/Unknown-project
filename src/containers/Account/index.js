import React, { PureComponent } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  AsyncStorage,
  BackHandler,
  Alert,
} from 'react-native';

import PropTypes from 'prop-types';
import firebase from 'react-native-firebase';
import { NavigationActions } from 'react-navigation';
import IconIon from 'react-native-vector-icons/Ionicons';
import IconAwe from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import {
  fetchDatagetUserDetail,
  fetchDataGetUserPin,
  fetchDatagetNewFeed,
  setUser,
} from '../../actions/';
import { Header } from '../../components';
import { Colors, Icons } from '../../themes';
import account from './style';
import AsyncImage from '../../components/AsyncImage';
import { Card, Menu, Statistic, ShowImage } from './component';
import images from '../../themes/Images';

class Account extends PureComponent {
  constructor(props) {
    super(props);
    this.otherUserId = props.navigation.getParam('idUser', null);
    this.setFollow = props.navigation.getParam('setFollow', () => {});
    this.user = props.user.user;
    /*eslint-disable*/
    this.state = {
      isOwner: true,
      isShowMenu: false,
      isFollow:
        this.otherUserId === null
          ? false
          : this.user.following
            ? this.user.following.indexOf(this.otherUserId) !== -1
            : false,
    };
    /* eslint-enable */
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

    this.onGetOtherUser();
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }
  onGetOtherUser = () => {
    if (this.otherUserId && this.otherUserId !== this.user.uid) {
      firebase
        .database()
        .ref(`root/users/${this.otherUserId}`)
        .on('value', (snapshot) => {
          this.otherUser = snapshot.val();
          this.item = snapshot.val();
          this.setState({
            ...this.otherUser,
            isOwner: false,
          });
          this.props.fetchDataGetUserPin(this.otherUser.uid);
        });
    } else {
      this.setState({
        ...this.user,
        isOwner: true,
      });
      this.props.fetchDataGetUserPin(this.user.uid);
    }
  };
  showMenu = () => {
    this.menu.open();
  };
  logOut = () => {
    AsyncStorage.removeItem('user');
    const navigateAction = NavigationActions.navigate({
      routeName: 'Auth',
      action: NavigationActions.navigate({ routeName: 'Login' }),
    });
    this.props.navigation.dispatch(navigateAction);
  };
  handleBackPress = () => {
    this.props.navigation.goBack(null);
    return true;
  };
  _onFollowPress = () => {
    const { isFollow } = this.state;
    const { user, item } = this;
    if (!isFollow) {
      const updates = {};
      item.follower = item.follower || [];
      user.following = user.following || [];
      updates[`/root/users/${item.uid}/follower`] = [...item.follower, user.uid];
      this.item.follower = [...item.follower, user.uid];
      updates[`/root/users/${user.uid}/following`] = [...user.following, item.uid];
      this.user.following = [...user.following, item.uid];
      firebase
        .database()
        .ref()
        .update(updates);
    } else {
      const updates = {};
      const index = item.follower ? item.follower.indexOf(user.uid) : -1;
      if (index !== -1) item.follower.splice(index, 1);
      updates[`/root/users/${item.uid}/follower`] = item.follower ? [...item.follower] : [];
      const index1 = user.following ? user.following.indexOf(item.uid) : -1;
      if (index1 !== -1) user.following.splice(index1, 1);
      updates[`/root/users/${user.uid}/following`] = user.following ? [...user.following] : [];
      firebase
        .database()
        .ref()
        .update(updates);
    }
    this.setState({ isFollow: !isFollow });
  };
  _reload = () => {
    const { user } = this.props.user;
    this.props.fetchDatagetNewFeed(user.uid);
    firebase
      .database()
      .ref('root/users')
      .child(user.uid)
      .on('value', (data) => {
        this.props.setUser(data._value);
      });
  };
  _reloadUser = () => {
    console.log('lad');
    const { user } = this.props.user;
    this.setState({
      ...user,
    });
  }
  render() {
    return (
      <View style={account.container}>
        <ShowImage
          onRef={(node) => { this.showImage = node; }}
          source={this.state.photoURL === '' ? images.defaultAvatar : { uri: this.state.photoURL }}
        />
        <View style={account.topView}>
          <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Header
              leftHeader={<Image source={Icons.back} />}
              onPressLeftHeader={() => {
                this._reload();
                this.props.navigation.goBack();
                this.setFollow(this.state.isFollow);
              }}
              centerHeader={<Text style={account.title}>Account</Text>}
              rightHeader={this.state.isOwner ? <Image source={Icons.menu} /> : null}
              onPressRightHeader={this.state.isOwner ? this.showMenu : null}
            />
            <View style={account.info}>
              <TouchableOpacity onPress={() => this.showImage.open()}>
                <AsyncImage
                  source={
                    this.state.photoURL === '' ? images.defaultAvatar : { uri: this.state.photoURL }
                  }
                  placeholderColor={Colors.textOpacity10}
                  style={account.avatar}
                />
              </TouchableOpacity>
              <Text style={account.name}>{this.state.fullName}</Text>
              <Text style={account.detail}>{this.state.gender}</Text>
              <Text style={account.detail}>{this.state.home}</Text>
            </View>
          </View>
          <View style={{ height: 20, width: 10 }} />
          {!this.state.isOwner ? (
            <TouchableOpacity
              style={this.state.isFollow ? account.btnFollowEd : account.btnFollow}
              onPress={this._onFollowPress}
            >
              <View style={{ flexDirection: 'row' }}>
                <IconIon
                  name={this.state.isFollow ? 'md-checkmark-circle-outline' : 'ios-add-circle'}
                  color={Colors.white}
                  size={18}
                  // style={{ margin: 5 }}
                />
                <Text
                  style={{
                    marginLeft: 5,
                    fontSize: 14,
                    color: 'white',
                    textAlign: 'center',
                  }}
                >
                  {this.state.isFollow ? 'Followed' : 'Follow'}
                </Text>
              </View>
            </TouchableOpacity>
          ) : null}
        </View>
        <View style={account.botView}>
          <View style={account.statisticView}>
            <Statistic
              data={this.state.follower}
              onPress={() => {
                if (this.state.follower > 0) {
                  this.props.navigation.navigate('FindAround', {
                    followId: this.state.follower,
                    isFollowed: true,
                  });
                } else {
                  Alert.alert('Notice', 'No one is following you');
                }
              }}
              number={this.state.follower ? this.state.follower.length : 0}
              title="Follower"
            />
            <Statistic
              data={this.state.following}
              onPress={() => {
                if (this.state.following > 0) {
                  this.props.navigation.navigate('FindAround', {
                    followId: this.state.following,
                    isFollowed: false,
                  });
                } else {
                  Alert.alert('Notice', 'You do not follow anyone');
                }
              }}
              number={this.state.following ? this.state.following.length : 0}
              title="Followings"
            />
            <Statistic
              data={this.props.dataUserPin}
              onPress={() => {}}
              number={this.props.dataUserPin.data.length ? this.props.dataUserPin.data.length : 0}
              title="Pin"
            />
          </View>
          <Text style={account.botRestaurant}>Post</Text>
          {this.props.dataUserPin.data.length === 0 ? (
            <Text style={account.textNotPin}>You have not post yet.</Text>
          ) : (
            <FlatList
              horizontal
              data={this.props.dataUserPin.data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <Card
                  onPressNavi={() =>
                    this.props.navigation.navigate('HomeDetail', { data: item.restaurantPlaceId })
                  }
                  name={item.restaurantName}
                  image={item.content.photos[0]}
                  status={item.content.detail}
                  restaurantVicinity={item.restaurantVicinity}
                  review={item.rating}
                  restaurantPlaceId={item.restaurantPlaceId}
                />
              )}
            />
          )}
        </View>
        <Menu
          onRef={(node) => {
            this.menu = node;
          }}
          style={account.menu}
        >
          <View style={account.menuItem}>
            <View style={{ height: 25, width: 36 }}>
              <IconAwe name="edit" size={26} color="black" />
            </View>
            <Text
              style={account.menuText}
              onPress={() => {
                this.menu.close();
                this.props.navigation.navigate('UpdateUser1', {
                  reload: this._reloadUser,
                });
              }}
            >
              Edit Profile
            </Text>
          </View>
          <View style={account.menuItem}>
            <View style={{ height: 25, width: 36 }}>
              <Image
                source={Icons.changePassword}
                style={{ height: 24, width: 32, tintColor: 'black' }}
              />
            </View>
            <Text
              style={account.menuText}
              onPress={() => {
                this.menu.close();
                this.props.navigation.navigate('Change');
              }}
            >
              Change Password
            </Text>
          </View>
          <View style={account.menuItem}>
            <View style={{ height: 25, width: 36 }}>
              <IconIon name="ios-log-out" size={26} color="black" />
            </View>
            <Text style={[account.menuText, { color: 'red', fontWeight: '600' }]} onPress={this.logOut}>
              LOG OUT
            </Text>
          </View>
        </Menu>
      </View>
    );
  }
}

Account.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    params: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
  }).isRequired,
  fetchDataGetUserPin: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  dataUserPin: PropTypes.object.isRequired,
  fetchDatagetNewFeed: PropTypes.func, //eslint-disable-line
  setUser: PropTypes.func, //eslint-disable-line
};

const mapStateToProps = state => ({
  dataUserDetail: state.getUserDetailReducers,
  user: state.user,
  dataUserPin: state.getUserPinReducers,
});

const mapDispatchToProps = dispatch => ({
  fetchDatagetUserDetail: id => dispatch(fetchDatagetUserDetail(id)),
  fetchDataGetUserPin: id => dispatch(fetchDataGetUserPin(id)),
  fetchDatagetNewFeed: id => dispatch(fetchDatagetNewFeed(id)),
  setUser: user => dispatch(setUser(user)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Account);
