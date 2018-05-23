import React, { PureComponent } from 'react';
import { View, Text, TextInput } from 'react-native';
import header from './style';

class Header extends PureComponent {
  state = {};
  render() {
    return (
      <View style={header.container}>
        <View style={header.searchView}>
          <TextInput
            placeholder="Search Restaurants and ..."
            style={header.input}
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={header.place}>
          <Text style={header.in}>in</Text>
          <TextInput
            value="Hanoi, Vietnam"
            style={header.input}
            underlineColorAndroid="transparent"
          />
        </View>
      </View>
    );
  }
}

export default Header;
