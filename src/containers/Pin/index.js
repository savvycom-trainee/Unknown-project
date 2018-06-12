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
        <Header centerHeader={<Text style={styles.centerHeaderStyle}>Bookmark</Text>} />
        <FlatList
          data={restaurantData}
          renderItem={({ item, index }) => (
            <PinView
              item={item}
              index={index}
              onPress={() => {
                this.props.navigation.navigate('HomeDetail');
              }}
              onDirectPress={() => {
                this.props.navigation.navigate('Direct');
              }}
            />
          )}
          keyExtractor={item => item.restaurantName.toString()}
        />
      </View>
    );
  }
}

export default Pin;
