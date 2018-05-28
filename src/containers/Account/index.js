import React, { PureComponent } from 'react';
import { View, Text, StatusBar, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Header } from '../../components';
import icon from '../../themes/Icons';
import account from './style';

const defaultParam = {
  name: 'Chiến Mạnh Vũ',
  gender: 'Male',
  location: 'Hanoi',
  avatar: require('../../../assets/images/avata.png'), // eslint-disable-line
};
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
