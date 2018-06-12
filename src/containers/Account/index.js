import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  FlatList,
  AsyncStorage,
  BackHandler,
} from 'react-native';

import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { fetchDatagetUserDetail, fetchDataGetUserPin } from '../../actions/';
import { Header } from '../../components';
import icon from '../../themes/Icons';
import Loading from '../../components/LoadingContainer';
import account from './style';
import { Card, Statistic } from './component';
import images from '../../themes/Images';

class Account extends PureComponent {
  constructor(props) {
    super(props);
    const { params } = this.props.navigation;
    console.log(params);
    this.user = this.props.user.user;
    if (params) {
      this.state = {
        ...params,
        isOwner: false,
      };
    } else {
      this.state = {
        ...this.user,
        isOwner: true,
      };
    }
  }
  componentDidMount() {
    this.props.fetchDataGetUserPin(this.props.user.user.uid);
    console.log(this.props.navigation);

    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }
  getUserId = () => {};

  logOut = () => {
    console.log('logout');
    AsyncStorage.removeItem('user');
    const navigateAction = NavigationActions.navigate({
      routeName: 'Auth',
      action: NavigationActions.navigate({ routeName: 'Login' }),
    });
    this.props.navigation.dispatch(navigateAction);
  };
  render() {
    console.log(this.state);
    return (
      <View style={account.container}>
        <StatusBar hidden />
        <View style={account.topView}>
          <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Header
              leftHeader={
                this.state.isOwner ? (
                  <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                    <Image source={icon.back} />
                  </TouchableOpacity>
                ) : null
              }
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
            <TouchableOpacity style={account.btnFollow}>
              <Image source={icon.follow} style={account.imageFollow} />
              <Text
                style={{
                  fontSize: 14,
                  lineHeight: 14,
                  color: 'white',
                  textAlign: 'center',
                }}
              >
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
              title="Pin"
            />
          </View>
          <Text style={account.botRestaurant}>My Pin</Text>
          <FlatList
            horizontal
            data={this.props.dataUserPin.data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Card
                name={item.restaurantName}
                image={item.content.photos[0]}
                status={item.content.detail}
                restaurantVicinity={item.restaurantVicinity}
                review={item.rating}
                restaurantPlaceId={item.restaurantPlaceId}
              />
            )}
          />
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
  }).isRequired,
  fetchDataGetUserPin: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  dataUserPin: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  dataUserDetail: state.getUserDetailReducers,
  user: state.user,
  dataUserPin: state.getUserPinReducers,
});

const mapDispatchToProps = dispatch => ({
  fetchDatagetUserDetail: id => dispatch(fetchDatagetUserDetail(id)),
  fetchDataGetUserPin: id => dispatch(fetchDataGetUserPin(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Account);
