import React, { PureComponent } from 'react';
import { View, Text, ScrollView } from 'react-native';
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
      },
      {
        id: 'abcdbcdefdsfdsaf',
        image: images.restaurantPhoto,
        number: 9.0,
      },
      {
        id: 'abcdbcdeffsdfsdf',
        image: images.restaurantPhoto,
        number: 9.0,
      },
      {
        id: 'abcdbcdeffsdf',
        image: images.restaurantPhoto,
        number: 9.0,
      },
      {
        id: 'abcdbcdef123213',
        image: images.restaurantPhoto,
        number: 9.0,
      },
    ],
  };
  render() {
    return (
      <View style={search.container}>
        <View style={search.header}>
          <Header />
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
