import React, { PureComponent } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import { Icons } from '../../themes';
import Content from './Content';
import styles from './styles';
import Data from './Data';

class User extends PureComponent {
  state = {};
  render() {
    return (
      <View style={styles.ViewMain}>
        <Header
          leftHeader={
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Image source={Icons.back} style={styles.back} />
            </TouchableOpacity>
          }
          centerHeader={<Text style={{ fontSize: 15, fontWeight: '600' }}>User</Text>}
        />
        <FlatList
          data={Data}
          renderItem={({ item }) => <Content data={item} />}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}
User.propTypes = {
  navigation: PropTypes.object.isRequired,
};
export default User;
