import React, { PureComponent } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../../themes';
/* eslint-disable */

import styles from './styles';

class Content extends PureComponent {
  state = {};
  render() {
    return (
      <View style={styles.ViewMain}>
        <View style={styles.ViewAvatar}>
          <Image source={{ uri: this.props.data.photoURL }} style={styles.Avatar} />
        </View>
        <View style={styles.ViewContent}>
          <View style={styles.ViewFollow}>
            <View style={styles.ViewFollowNameTime}>
              <Text style={styles.TextName}>{this.props.data.name}</Text>
              <View style={styles.ViewAge}>
                <Icon name="md-locate" style={styles.icon} color={Colors.default} size={16} />
                <Text style={styles.TextTime}>{this.props.data.fullName} </Text>
              </View>
              <View style={styles.ViewAge}>
                <Icon name="md-ionitron" style={styles.icon} color={Colors.default} size={16} />
                <Text style={styles.TextTime}>{this.props.data.home} </Text>
              </View>
            </View>
            <View style={styles.ViewBTN}>
              <TouchableOpacity style={styles.ViewFollowBtn}>
                <Text style={styles.TextBtnFollow}>+ FOLLOW</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default Content;
