import React, { PureComponent } from 'react';
import { View, Text, Image } from 'react-native';
import { Header } from '../../components';
import { Icons } from '../../themes';

class Direct extends PureComponent {
  state = {};
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          leftHeader={<Image source={Icons.back} />}
          centerHeader={<Text style={{ fontSize: 15, fontWeight: '600' }}>Direct</Text>}
          onPressLeftHeader={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

export default Direct;
