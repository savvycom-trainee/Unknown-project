import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import styles from './styles';
import { Icons } from '../../../themes';
// import Icons from 'react-native-vector-icons';
import Content from './Content';
import Data from './Data';

class HomeReviewRestaurant extends PureComponent {
  state = {};
  render() {
    return (
      <View style={styles.ViewMain}>
        <View style={styles.ViewHeader}>
          <TouchableOpacity onPress={this.props.onPressGoBack}>
            <Image source={Icons.back} style={styles.IconBack} />
          </TouchableOpacity>
          <View>
            <Text style={styles.Title}>Review</Text>
          </View>
          <TouchableOpacity>
            <Image source={Icons.search} style={styles.IconSearch} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.ViewBtnAdd}>
          <Text style={styles.BtnAdd}>+</Text>
        </TouchableOpacity>

        <View style={styles.ViewContent}>
          <FlatList
            // refreshing={this.state.isReloading}
            // onRefresh={this.handleRefesh}

            data={Data}
            renderItem={({ item }) => <Content data={item} />}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    );
  }
}

export default HomeReviewRestaurant;
