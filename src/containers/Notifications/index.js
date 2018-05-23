import React, { PureComponent } from 'react';
import { View, Text, Image, FlatList } from 'react-native';
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
          leftHeader={<Image source={Icons.menu} style={{ marginTop: 2 * d.ratioH }} />}
          centerHeader={<Text style={{ fontSize: 15, fontWeight: '600' }}>Notification</Text>}
          rightHeader={<Image source={Icons.user} />}
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

export default Notifications;
