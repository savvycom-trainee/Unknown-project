import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import styles from './styles';
import Header from '../../../components/Header';
import { Icons } from '../../../themes';
import * as d from '../../../utilities/Tranform';
import Content from './Content';

class HomeMenuRestaurant extends PureComponent {
  state = {};

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
            data={this.props.data.menu}
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
