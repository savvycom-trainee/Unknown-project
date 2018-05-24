import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import styles from './styles';
import { Icons } from '../../../themes';
// import Icons from 'react-native-vector-icons';
import Content from './Content';
import Data from './Data';
import Header from '../../../components/Header';
import * as d from '../../../utilities/Tranform';

class HomeReviewRestaurant extends PureComponent {
  state = {};
  render() {
    return (
      <View style={styles.ViewMain}>
        {/* <View style={styles.ViewHeader}>
          <TouchableOpacity onPress={this.props.onPressGoBack}>
            <Image source={Icons.back} style={styles.IconBack} />
          </TouchableOpacity>
          <View>
            <Text style={styles.Title}>Review</Text>
          </View>
          <TouchableOpacity>
            <Image source={Icons.search} style={styles.IconSearch} />
          </TouchableOpacity>
        </View> */}
        <Header
          leftHeader={<Image source={Icons.back} style={{ marginTop: 2 * d.ratioH }} />}
          onPressLeftHeader={this.props.onPressGoBack}
          centerHeader={<Text style={{ fontSize: 15, fontWeight: '600' }}>Review</Text>}
          rightHeader
        />

        <TouchableOpacity style={styles.ViewBtnAdd}>
          <Text style={styles.BtnAdd}>+</Text>
        </TouchableOpacity>

        <View style={styles.ViewContent}>
          <FlatList
            // refreshing={this.state.isReloading}
            // onRefresh={this.handleRefesh}

            data={this.props.data.review}
            renderItem={({ item }) => <Content data={item} />}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    );
  }
}
HomeReviewRestaurant.propTypes = {
  onPressGoBack: PropTypes.func,
};

HomeReviewRestaurant.defaultProps = {
  onPressGoBack: () => {},
};

export default HomeReviewRestaurant;
