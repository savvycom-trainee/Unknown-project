import React, { PureComponent } from 'react';
import { View, Text, Image, FlatList } from 'react-native';
/* eslint-disable */
import styles from './styles';
import { Images } from '../../../../themes';

class Content extends PureComponent {
  state = {};

  gallery() {
    if (this.props.data.image.length == 0) {
      return null;
    } else {
      return (
        <FlatList
          style={styles.ViewGallery}
          data={this.props.data.image}
          renderItem={({ item }) => <Image source={{ uri: item }} style={styles.gallery} />}
          keyExtractor={(item, index) => index.toString()}
        />
      );
    }
  }

  render() {
    return (
      <View style={styles.ViewMain}>
        <View style={styles.ViewMainChild}>
          <View style={styles.ViewMainChildTop}>
            <View style={styles.ViewAvatar}>
              <Image source={require('../Data/images/1.png')} style={styles.avatar} />
            </View>
            <View style={styles.ViewNameHours}>
              <Text style={styles.TextName}>{this.props.data.name}</Text>
              <Text style={styles.TextHoursComment}>12 hour</Text>
            </View>
            <View style={styles.ViewScore}>
              <Text style={styles.TextScore}>{this.props.data.rating}/10</Text>
            </View>
          </View>
          <View style={styles.ViewMainChildBottom}>
            <Text style={styles.TextHoursComment}>{this.props.data.comment}</Text>
          </View>
          {this.gallery()}
        </View>
      </View>
    );
  }
}

export default Content;
