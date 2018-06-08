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
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import { Header } from '../../components';
import icon from '../../themes/Icons';
import account from './style';
import { Card, Statistic } from './component';
import images from '../../themes/Images';

const data = [
  {
    id: 'abcd',
    image: images.restaurantPhoto,
    number: 9.2,
    name: 'Sublimotion',
    type: 'RESTAURANT',
    status: 1,
    distance: 0.4,
  },
  {
    id: 'abcdbcdefdsfdsaf',
    image: images.restaurantPhoto,
    number: 9.0,
    name: 'HestonBlumenthal',
    type: 'RESTAURANT',
    status: 0,
    distance: 1,
  },
  {
    id: 'abcdbcdeffsdfsdf',
    image: images.restaurantPhoto,
    number: 9.0,
    name: 'Le Meurice',
    type: 'RESTAURANT',
    status: 1,
    distance: 0.8,
  },
  {
    id: 'abcdbcdeffsdf',
    image: images.restaurantPhoto,
    number: 9.0,
    name: 'Chien Manh Vu',
    type: 'RESTAURANT',
    status: 1,
    distance: 0.5,
  },
  {
    id: 'abcdbcdef123213',
    image: images.restaurantPhoto,
    number: 9.0,
    name: 'Vu Manh Chien',
    type: 'RESTAURANT',
    status: 0,
    distance: 10,
  },
];

class Account extends PureComponent {
  constructor(props) {
    super(props);
    const { params } = this.props.navigation;
    console.log(params);
    if (params) {
      this.state = {
        ...params,
        isOwner: false,
      };
    } else {
      this.state = {
        ...props.user.user,
        isOwner: true,
      };
    }
  }
  componentDidMount() {
    console.log(this.props.navigation);

    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }
  getUserId = () => {};

  logOut = () => {
    AsyncStorage.removeItem('user');
    AsyncStorage.removeItem('accessToken');
    firebase.auth().signOut();
    const navigateAction = NavigationActions.navigate({
      routeName: 'Auth',
      action: NavigationActions.navigate({ routeName: 'Login' }),
    });
    console.log('logout');
    this.props.navigation.dispatch(navigateAction);
  };
  render() {
    return (
      <View style={account.container}>
        <StatusBar hidden />
        <View style={account.topView}>
          <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Header
              leftHeader={
                this.state.isOwner ? (
                  <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                    <Image source={icon.back} style={account.back} />
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
                source={this.state.photoURL ? { uri: this.state.photoURL } : images.defaultAvatar}
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
            <Statistic number={1000} title="Follower" />
            <Statistic number={100} title="Followings" />
            <Statistic number={10} title="Share" />
          </View>
          <Text style={account.botRestaurant}>My Restaurant</Text>
          <FlatList
            horizontal
            data={data}
            keyExtractor={(item, index) => `${item.id}${index}`}
            renderItem={({ item }) => (
              <Card
                name={item.name}
                image={item.image}
                status={item.status}
                distance={item.distance}
                review={item.number}
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
  user: PropTypes.object.isRequired,
};

const mapStateToProp = state => ({
  user: state.user,
});

export default connect(mapStateToProp)(Account);
