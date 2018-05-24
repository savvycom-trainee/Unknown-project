import React, { PureComponent } from 'react';
import { View, Text, TextInput } from 'react-native';
import header from './style';

class Header extends PureComponent {
  state = {};
  searchSubmit = () => {
    const value = this.search._getText();
    console.log(value);
    console.log(this.search);
  };
  searchBlur = () => {
    console.log('search blur');
  };
  placeSubmit = () => {
    const value = this.place._value;
    console.log(value);
  };
  render() {
    return (
      <View style={header.container}>
        <View style={header.searchView}>
          <TextInput
            ref={(ref) => {
              this.search = ref;
            }}
            placeholder="Search Restaurants and ..."
            style={[header.input, { textAlign: 'center' }]}
            underlineColorAndroid="transparent"
            onSubmitEditing={this.searchSubmit}
            inlineImageLeft="search_icon"
          />
        </View>
        <View style={header.place}>
          <Text style={header.in}>in</Text>
          <View style={header.borderBottom}>
            <TextInput
              ref={(ref) => {
                this.place = ref;
              }}
              defaultValue="Hanoi, Vietnam"
              style={header.input}
              underlineColorAndroid="transparent"
              onSubmitEditing={this.placeSubmit}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default Header;
