import React, { PureComponent } from 'react';
import { View, Text, TextInput } from 'react-native';
import header from './style';

class Header extends PureComponent {
  state = {};
  render() {
    return (
      <View style={header.container}>
        <TextInput placeholder="Search Restaurants and ..." style={header.input} />
        <View style={header.place}>
          <Text>In</Text>
          <TextInput value="Hanoi, Vietnam" style={header.input} />
        </View>
      </View>
    );
  }
}

export default Header;
