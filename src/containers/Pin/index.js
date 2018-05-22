import React, { PureComponent } from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import { Header } from '../../components';
import { Icons } from '../../themes';
import restaurantData from './PinView/data/restaurantData';
import PinView from './PinView';
import styles from './styles';

class Pin extends PureComponent {
  state = {};
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          leftHeader={<Image source={Icons.menu} />}
          centerHeader={<Text style={styles.centerHeaderStyle}>Bookmark</Text>}
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
