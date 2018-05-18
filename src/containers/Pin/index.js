import React, { PureComponent } from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import { Header } from '../../components';
import { Icons } from '../../themes';
import * as d from '../../utilities/Tranform';
import restaurantData from './PinView/data/restaurantData';
import PinView from './PinView';

class Pin extends PureComponent {
  state = {};
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          leftHeader={<Image source={Icons.menu} style={{ marginTop: 2 * d.ratioH }} />}
          centerHeader={<Text style={{ fontSize: 15, fontWeight: '600' }}>Bookmark</Text>}
          rightHeader={<Image source={Icons.user} />}
        />
        <FlatList
          data={restaurantData}
          renderItem={({ item, index }) => <PinView item={item} index={index} />}
          keyExtractor={item => item.restaurantName.toString()}
        />
      </View>
    );
  }
}

export default Pin;
