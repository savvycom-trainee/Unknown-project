import React, { PureComponent } from 'react';
import { View, Text, Image } from 'react-native';

import styles from './styles';
import { Images } from '../../../../themes';

class Content extends PureComponent {
  state = {};
  render() {
    return (
      <View style={styles.ViewMain}>
        <View style={styles.ViewImg}>
          <Image source={Images.restaurantPhotoMenu1} style={styles.Img} />
        </View>
        <View style={styles.ViewContent}>
          <View style={styles.ViewTitleCost}>
            <View style={styles.ViewTitle}>
              <Text style={styles.TextTitle}>{this.props.data.Title}</Text>
            </View>
            <View style={styles.ViewCost}>
              <Text style={styles.TextCost}>${this.props.data.Cost},00</Text>
            </View>
          </View>
          <View style={styles.ViewDescription}>
            <Text style={styles.TextDescription}>{this.props.data.Description}</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default Content;
