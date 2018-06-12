import React, { PureComponent } from 'react';
import { View, Text, Image, FlatList } from 'react-native';
/* eslint-disable */
import styles from './styles';
import { Images } from '../../../../themes';

class Content extends PureComponent {
  state = {};

  gallery() {
    //console.log();
    if (this.props.data.content.hasOwnProperty('photos')) {
      if (this.props.data.content.photos <= 0) {
        return null;
      } else {
        return (
          <FlatList
            style={styles.ViewGallery}
            data={this.props.data.content.photos}
            renderItem={({ item }) => <Image source={{ uri: item }} style={styles.gallery} />}
            keyExtractor={(item, index) => index.toString()}
          />
        );
      }
    } else {
      return null;
    }
  }

  render() {
    return (
      <View style={styles.ViewMain}>
        <View style={styles.ViewMainChild}>
          <View style={styles.ViewMainChildTop}>
            <View style={styles.ViewAvatar}>
              <Image source={{ uri: this.props.data.userAvatar }} style={styles.avatar} />
            </View>
            <View style={styles.ViewNameHours}>
              <Text style={styles.TextName}>{this.props.data.userName}</Text>
              <Text style={styles.TextHoursComment}>{this.props.data.created}</Text>
            </View>
            <View style={styles.ViewScore}>
              <Text style={styles.TextScore}>{this.props.data.rating}/5</Text>
            </View>
          </View>
          <View style={styles.ViewMainChildBottom}>
            <Text style={styles.TextHoursComment}>{this.props.data.content.detail}</Text>
          </View>
          {this.gallery()}
          <View style={styles.ViewMainChildBottom}>
            <Text style={styles.TextHoursComment}>{this.props.data.restaurantName}</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default Content;
