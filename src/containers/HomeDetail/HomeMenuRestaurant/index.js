import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import styles from './styles';
import Header from '../../../components/Header';
import { Icons } from '../../../themes';
import * as d from '../../../utilities/Tranform';
import Content from './Content';

class HomeMenuRestaurant extends PureComponent {
  state = {
    data: [
      {
        imageName: 'restaurantPhotoMenu1',
        Title: 'Salads, Soups & Chili',
        Description: 'Neque porro quisquam est qui dolorem ipsum quia dolor...',
        Cost: 7,
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
        <Header
          leftHeader={<Image source={Icons.back} style={{ marginTop: 2 * d.ratioH }} />}
          onPressLeftHeader={this.props.onPressGoBack}
          centerHeader={<Text style={{ fontSize: 15, fontWeight: '600' }}>Menu</Text>}
          rightHeader={<Image source={Icons.search} />}
        />
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

HomeMenuRestaurant.propTypes = {
  onPressGoBack: PropTypes.func,
};

HomeMenuRestaurant.defaultProps = {
  onPressGoBack: () => {},
};

export default HomeMenuRestaurant;
