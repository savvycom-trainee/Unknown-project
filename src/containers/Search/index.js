import React, { PureComponent } from 'react';
import { View, Text, ScrollView, StatusBar } from 'react-native';
import search from './style';
import images from '../../themes/Images';
import { Header, Card } from './components';

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
  searchInfo = (text) => {
    console.log(text);
  };
  placeInfo = (text) => {
    console.log(text);
  };
  render() {
    return (
      <View style={search.container}>
        <StatusBar backgroundColor="white" barStyle="light-content" />
        <View style={search.header}>
          <Header searchInfo={this.searchInfo} placeInfo={this.placeInfo} />
        </View>
        <Text style={search.title}>Recommended for you</Text>
        <ScrollView style={search.resultView}>
          <Card dataSearch={this.state.data} />
        </ScrollView>
        {/* <View style={search.opacity} /> */}
      </View>
    );
  }
}

export default Search;
