import React, { PureComponent } from 'react';
import { View, Text, StatusBar, Image, TouchableOpacity } from 'react-native';
import { Header } from '../../components';
import icon from '../../themes/Icons';
import account from './style';

class Account extends PureComponent {
  state = {};
  render() {
    return (
      <View style={account.container}>
        <StatusBar hidden />
        <View style={account.topView}>
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
            <Image source={require('../../../assets/images/avata.png')} style={account.avatar} />
            <Text style={account.name}>Chiến Mạnh Vũ</Text>
            <Text style={account.detail}>Male, Hanoi</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default Account;
