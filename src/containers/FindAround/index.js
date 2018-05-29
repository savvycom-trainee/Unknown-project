import React, { PureComponent } from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import Header from '../../components/Header';
import { Icons } from '../../themes';
import * as d from '../../utilities/Tranform';
import FindCard from './FindCard';
// import styles from './styles';

const Data = [
  {
    name: 'nguyenlindl',
    gender: 'Male',
    distance: '500m',
  },
  {
    name: 'nguyenlindl',
    gender: '',
    distance: '500m',
  },
  {
    name: 'nguyenlindl',
    gender: 'Male',
    distance: '500m',
  },
  {
    name: 'nguyenlindl',
    gender: 'Male',
    distance: '500m',
  },
  {
    name: 'nguyenlindl',
    gender: '',
    distance: '500m',
  },
  {
    name: 'nguyenlindl',
    gender: 'Male',
    distance: '500m',
  },
];
class Notifications extends PureComponent {
  state = {};
  // TODO navigate to user detail
  _renderItem = ({ item, index }) => <FindCard item={item} index={index} />;
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          leftHeader={<Image source={Icons.menu} style={{ marginTop: 2 * d.ratioH }} />}
          centerHeader={<Text style={{ fontSize: 15, fontWeight: '600' }}>Find Around</Text>}
          rightHeader={<Image source={Icons.user} />}
        />
        <FlatList
          style={{ flex: 1 }}
          data={Data}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

export default Notifications;
