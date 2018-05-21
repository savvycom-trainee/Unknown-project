import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import styles from './styles';
import { Icons } from '../../../themes';
// import Icons from 'react-native-vector-icons';

class HomeReviewRestaurant extends PureComponent {
  state = {};
  render() {
    return (
      <View style={styles.ViewMain}>
        <View style={styles.ViewHeader}>
          <TouchableOpacity>
            <Image source={Icons.back} style={styles.IconBack} />
          </TouchableOpacity>
          <View>
            <Text style={styles.Title}>Review</Text>
          </View>
          <TouchableOpacity>
            <Image source={Icons.search} style={styles.IconSearch} />
          </TouchableOpacity>
        </View>
        <View style={styles.ViewContent}>
          {/* <FlatList
            // refreshing={this.state.isReloading}
            // onRefresh={this.handleRefesh}

            data={this.state.data}
            renderItem={({ item }) => <Content data={item} />}
            keyExtractor={(item, index) => index.toString()}
          /> */}
        </View>
      </View>
    );
  }
}

export default HomeReviewRestaurant;
