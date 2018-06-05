import React, { PureComponent } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
/* eslint-disable */

import styles from './styles';

class Content extends PureComponent {
  state = {};
  dataContent = type => {
    if (type === 'follow') {
      return (
        <View style={styles.ViewFollow}>
          <View style={styles.ViewFollowNameTime}>
            <Text style={styles.TextName}>{this.props.data.name}</Text>
            <Text style={styles.TextFollowYou}>followed you</Text>
            <Text style={styles.TextTime}>{this.props.data.time} </Text>
          </View>
          <View>
            <TouchableOpacity style={styles.ViewFollowBtn}>
              <Text style={styles.TextBtnFollow}>+ FOLLOW</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else if (type === 'discount') {
      return (
        <View style={styles.ViewFollow}>
          <View style={styles.ViewFollowNameTime}>
            <Text>
              <Text style={styles.TextName}>{this.props.data.name} </Text>
              <Text style={styles.TextFollowYou}>{this.props.data.type} </Text>
              <Text style={styles.TextHightlight}>{this.props.data.highlight}% </Text>
              <Text style={styles.TextFollowYou}>{this.props.data.description} </Text>
            </Text>
            <Text style={styles.TextTime}>{this.props.data.time} </Text>
          </View>
        </View>
      );
    } else if (type === 'close for maintenance on') {
      return (
        <View style={styles.ViewFollow}>
          <View style={styles.ViewFollowNameTime}>
            <Text>
              <Text style={styles.TextName}>{this.props.data.name} </Text>
              <Text style={styles.TextFollowYou}>{this.props.data.type} </Text>
              <Text style={styles.TextHightlight}>{this.props.data.highlight} </Text>
            </Text>
            <Text style={styles.TextTime}>{this.props.data.time} </Text>
          </View>
        </View>
      );
    } else if (type === 'created a collection') {
      return (
        <View style={styles.ViewFollow}>
          <View style={styles.ViewFollowNameTime}>
            <Text>
              <Text style={styles.TextName}>{this.props.data.name} </Text>
              <Text style={styles.TextFollowYou}>{this.props.data.type}: </Text>
              <Text style={styles.TextName}>{this.props.data.description} </Text>
            </Text>
            <Text style={styles.TextTime}>{this.props.data.time} </Text>
          </View>
        </View>
      );
    }
    return <Text>null</Text>;
  };

  render() {
    return (
      <View style={styles.ViewMain}>
        <View style={styles.ViewAvatar}>
          <Image source={this.props.data.avatar} style={styles.Avatar} />
        </View>
        <View style={styles.ViewContent}>{this.dataContent(this.props.data.type)}</View>
      </View>
    );
  }
}

export default Content;
