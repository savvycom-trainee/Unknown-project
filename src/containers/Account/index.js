import React, { PureComponent } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  AsyncStorage,
  BackHandler,
} from 'react-native';

import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from 'react-native-firebase';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import {
  fetchDatagetUserDetail,
  fetchDataGetUserPin,
  fetchDatagetNewFeed,
  setUser,
} from '../../actions/';
import { Header } from '../../components';
import icon from '../../themes/Icons';
import account from './style';
import { Card, Statistic } from './component';
import images from '../../themes/Images';

class Account extends PureComponent {
  constructor(props) {
    super(props);
    this.otherUserId = props.navigation.getParam('idUser', null);
    this.setFollow = props.navigation.getParam('setFollow', () => {});
    this.user = props.user.user;
    console.log(this.user);
    /*eslint-disable*/
    this.state = {
      isOwner: true,
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
    console.log(this.user.uid);
    if (this.otherUserId && this.otherUserId !== this.user.uid) {
      firebase
        .database()
        .ref(`root/users/${this.otherUserId}`)
        .on('value', (snapshot) => {
          this.otherUser = snapshot.val();
          console.log(snapshot.val());
          this.item = snapshot.val();
          this.setState({
            ...this.otherUser,
            isOwner: false,
          });
          this.props.fetchDataGetUserPin(this.otherUser.uid);
        });
    } else {
      console.log(this.user);
      this.setState({
        ...this.user,
        isOwner: true,
      });
      this.props.fetchDataGetUserPin(this.user.uid);
    }
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
    console.log('_reload', user.uid);
    this.props.fetchDatagetNewFeed(user.uid);
    firebase
      .database()
      .ref('root/users')
      .child(user.uid)
      .on('value', (data) => {
        this.props.setUser(data._value);
      });
  };
  render() {
    // const { user } = this.props.user;
    // console.log('user,', user);
    return (
      <View style={account.container}>
        {/* <StatusBar hidden /> */}
        <View style={account.topView}>
          <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Header
              leftHeader={<Image source={icon.back} />}
              onPressLeftHeader={() => {
                this._reload();
                this.props.navigation.goBack();
                this.setFollow(this.state.isFollow);
              }}
              centerHeader={<Text style={account.title}>Account</Text>}
              rightHeader={
                this.state.isOwner ? (
                  <View style={account.viewButton}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('UpdateUser')}>
                      <Icon name="ios-contact" size={30} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.logOut()}>
                      <Icon name="md-log-out" style={{ paddingLeft: 12 }} size={30} color="red" />
                    </TouchableOpacity>
                  </View>
                ) : null
              }
            />
            <View style={account.info}>
              <Image
                source={
                  this.state.photoURL === '' ? images.defaultAvatar : { uri: this.state.photoURL }
                }
                style={account.avatar}
              />
              <Text style={account.name}>{this.state.fullName}</Text>
              <Text style={account.detail}>
                {this.state.gender}, {this.state.home}
              </Text>
            </View>
          </View>
          <View style={{ height: 20, width: 10 }} />
          {!this.state.isOwner ? (
            <TouchableOpacity style={account.btnFollow} onPress={this._onFollowPress}>
              {/* <Image source={icon.follow} style={account.imageFollow} /> */}
              <Text
                style={{
                  fontSize: 14,
                  color: 'white',
                  textAlign: 'center',
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    color: 'white',
                    textAlign: 'center',
                  }}
                >
                  {this.state.isFollow ? '√  ' : '+  '}
                </Text>
                Follow
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
        <View style={account.botView}>
          <View style={account.statisticView}>
            <Statistic
              number={this.state.follower ? this.state.follower.length : 0}
              title="Follower"
            />
            <Statistic
              number={this.state.following ? this.state.following.length : 0}
              title="Followings"
            />
            <Statistic
              number={this.props.dataUserPin.data.length ? this.props.dataUserPin.data.length : 0}
              title="Post"
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
