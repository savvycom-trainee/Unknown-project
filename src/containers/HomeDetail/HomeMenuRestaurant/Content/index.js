import React, { PureComponent } from 'react';
import { View, Text, Image } from 'react-native';

import { Images } from '../../../../themes';

class Content extends PureComponent {
  state = {};
  render() {
    return (
      <View>
        <Image source={Images.restaurantPhotoMenu1} style={{ height: 30, width: 30 }} />
        <Text>{this.props.data.Title}</Text>
        <Text>{this.props.data.Description}</Text>
        <Text>{this.props.data.Cost}</Text>
      </View>
    );
  }
}

export default Content;
