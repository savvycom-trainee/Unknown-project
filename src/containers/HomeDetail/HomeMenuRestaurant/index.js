import React, { PureComponent } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import styles from './styles';
import { Icons } from '../../../themes';
import Content from './Content';

class HomeMenuRestaurant extends PureComponent {
  state = {
    data: [
      {
        imageName: 'restaurantPhotoMenu1',
        Title: 'Salads, Soups & Chili',
        Description: 'Neque porro quisquam est qui dolorem ipsum quia dolor...',
        Cost: 7.03,
      },
      {
        imageName: 'restaurantPhotoMenu2',
        Title: 'Smokehouse Combos',
        Description: 'Neque porro quisquam est qui dolorem ipsum quia dolor...',
        Cost: 12,
      },
      {
        imageName: 'restaurantPhotoMenu3',
        Title: 'Chicken & Seafood',
        Description: 'Neque porro quisquam est qui dolorem ipsum quia dolor...',
        Cost: 5.0,
      },
      {
        imageName: 'restaurantPhotoMenu4',
        Title: 'Party Platter Add-Ons',
        Description: 'Neque porro quisquam est qui dolorem ipsum quia dolor...',
        Cost: 30.0,
      },
      {
        imageName: 'restaurantPhotoMenu1',
        Title: 'Smokehouse Combos',
        Description: 'Neque porro quisquam est qui dolorem ipsum quia dolor...',
        Cost: 13.0,
      },
    ],
  };

  render() {
    return (
      <View style={styles.ViewMain}>
        <View style={styles.ViewHeader}>
          <TouchableOpacity>
            <Image source={Icons.back} style={styles.IconBack} />
          </TouchableOpacity>
          <View>
            <Text style={styles.Title}>Menu</Text>
          </View>
          <TouchableOpacity>
            <Image source={Icons.search} style={styles.IconSearch} />
          </TouchableOpacity>
        </View>
        <View style={styles.ViewContent}>
          <FlatList
            // refreshing={this.state.isReloading}
            // onRefresh={this.handleRefesh}
            data={this.state.data}
            renderItem={({ item }) => <Content data={item} />}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    );
  }
}

export default HomeMenuRestaurant;
