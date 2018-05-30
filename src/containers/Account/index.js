import React, { PureComponent } from 'react';
import { View, Text, StatusBar, Image, TouchableOpacity, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { Header } from '../../components';
import icon from '../../themes/Icons';
import account from './style';
import { Card, Statistic } from './component';
import images from '../../themes/Images';

const defaultParam = {
  name: 'Chiến Mạnh Vũ',
  gender: 'Male',
  location: 'Hanoi',
  avatar: require('../../../assets/images/avata.png'), // eslint-disable-line
};
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
    this.state = params || defaultParam;
  }
  render() {
    return (
      <View style={account.container}>
        <StatusBar hidden />
        <View style={account.topView}>
          <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Header
              leftHeader={
                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                  <Image source={icon.back} style={account.back} />
                </TouchableOpacity>
              }
              centerHeader={<Text style={account.title}>Account</Text>}
              rightHeader={<Text />}
            />
            <View style={account.info}>
              <Image source={this.state.avatar} style={account.avatar} />
              <Text style={account.name}>{this.state.name}</Text>
              <Text style={account.detail}>
                {this.state.gender}, {this.state.location}
              </Text>
            </View>
          </View>
          <View style={{ height: 20, width: 10, backgroundColor: 'red' }} />
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
  }).isRequired,
};

export default Account;
