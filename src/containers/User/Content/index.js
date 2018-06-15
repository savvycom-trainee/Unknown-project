import React, { PureComponent } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../../themes';
/* eslint-disable */

import styles from './styles';

class Content extends PureComponent {
  state = {};
  render() {
    console.log(this.props.data.uid);
    return (
      <View style={styles.ViewMain}>
        <View style={styles.ViewAvatar}>
          {this.props.data.photoURL ? (
            <Image source={{ uri: this.props.data.photoURL }} style={styles.Avatar} />
          ) : (
            <View style={styles.Avatar}>
              <Icon name="md-contact" size={66} color={Colors.textOpacity} />
            </View>
          )}
        </View>
        <View style={styles.ViewContent}>
          <View style={styles.ViewFollow}>
            <View style={styles.ViewFollowNameTime}>
              <Text style={styles.TextName}>{this.props.data.fullName}</Text>
              <View style={styles.ViewAge}>
                <Icon name="md-ionitron" style={styles.icon} color={Colors.default} size={16} />
                <Text style={styles.TextTime}>
                  {this.props.data.pin ? Object.keys(this.props.data.pin).length : 0}{' '}
                </Text>
              </View>
              <View style={styles.ViewAge}>
                <Icon name="md-locate" style={styles.icon} color={Colors.default} size={16} />
                <Text style={styles.TextTime}>{this.props.data.home} </Text>
              </View>
            </View>
            <View style={styles.ViewBTN}>
              <TouchableOpacity style={styles.ViewFollowBtn} onPress={this.props.onPress}>
                <Text style={styles.TextBtnFollow}>+ PROFILE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default Content;
