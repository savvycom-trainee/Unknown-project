import React, { PureComponent } from 'react';
import { View, Text, ScrollView, StatusBar, TextInput } from 'react-native';
import { search, header } from './style';
import images from '../../themes/Images';
import Card from './components';

class Search extends PureComponent {
  state = {
    data: [
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
    ],
  };
  searchSubmit = () => {
    const value = this.search._lastNativeText;
    console.log(value);
    console.log(this.search);
  };
  placeSubmit = () => {
    const value = this.place._lastNativeText;
    console.log(value);
  };
  searchBlur = () => {
    console.log('blur');
  };
  render() {
    return (
      <View style={search.container}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
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
              onBlur={this.searchBlur}
            />
          </View>
          <View style={header.place}>
            <Text style={header.in}> in </Text>
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
        <Text style={search.title}> Recommended for you </Text>
        <ScrollView style={search.resultView}>
          <Card dataSearch={this.state.data} />
        </ScrollView>
        {/* <View style={search.opacity} /> */}
      </View>
    );
  }
}

export default Search;
