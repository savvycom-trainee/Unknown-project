import React, { PureComponent } from 'react';
import { View, Text, Image } from 'react-native';

import styles from './styles';
import { Images } from '../../../../themes';

class Content extends PureComponent {
  state = {};

  render() {
    const gallery = this.props.data.isImages ? (
      <View style={styles.ViewGallery}>
        <Image source={this.props.data.Images[0].linkImage} style={styles.gallery} />
        <Image source={this.props.data.Images[1].linkImage} style={styles.gallery} />
        <Image source={this.props.data.Images[2].linkImage} style={styles.gallery} />
      </View>
    ) : null;
    return (
      <View style={styles.ViewMain}>
        <View style={styles.ViewMainChild}>
          <View style={styles.ViewMainChildTop}>
            <View style={styles.ViewAvatar}>
              <Image source={this.props.data.avatar} style={styles.avatar} />
            </View>
            <View style={styles.ViewNameHours}>
              <Text style={styles.TextName}>{this.props.data.name}</Text>
              <Text style={styles.TextHoursComment}>{this.props.data.hours} hour</Text>
            </View>
            <View style={styles.ViewScore}>
              <Text style={styles.TextScore}>{this.props.data.score}/10</Text>
            </View>
          </View>
          <View style={styles.ViewMainChildBottom}>
            <Text style={styles.TextHoursComment}>{this.props.data.comment}</Text>
          </View>
          {gallery}
        </View>
      </View>
    );
  }
}

export default Content;
