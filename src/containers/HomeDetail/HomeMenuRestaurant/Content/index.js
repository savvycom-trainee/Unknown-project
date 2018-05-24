import React, { PureComponent } from 'react';
import { View, Text, Image } from 'react-native';

/* eslint-disable */
import styles from './styles';
import { Images } from '../../../../themes';

class Content extends PureComponent {
  state = {};
  render() {
    return (
      <View style={styles.ViewMain}>
        <View style={styles.ViewImg}>
          <Image source={{ uri: this.props.data.imagemenu }} style={styles.Img} />
        </View>
        <View style={styles.ViewContent}>
          <View style={styles.ViewTitleCost}>
            <View style={styles.ViewTitle}>
              <Text style={styles.TextTitle}>{this.props.data.namemenu}</Text>
            </View>
            <View style={styles.ViewCost}>
              <Text style={styles.TextCost}>${this.props.data.pricemenu}</Text>
            </View>
          </View>
          <View style={styles.ViewDescription}>
            <Text style={styles.TextDescription}>{this.props.data.detailmenu}</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default Content;
