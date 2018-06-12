import React, { PureComponent } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import { Icons } from '../../themes';
import * as d from '../../utilities/Tranform';
import Content from './Content';
import styles from './styles';
import Data from './Data';

class Notifications extends PureComponent {
  state = {};
  render() {
    return (
      <View style={styles.ViewMain}>
        <Header
          centerHeader={<Text style={{ fontSize: 15, fontWeight: '600' }}>Notification</Text>}
          rightHeader={
            <TouchableOpacity onPress={() => this.props.navigation.navigate('User')}>
              <Icon name="ios-person-add" size={30} color="#000" />
            </TouchableOpacity>
          }
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
Notifications.propTypes = {
  navigation: PropTypes.object.isRequired,
};
export default Notifications;
