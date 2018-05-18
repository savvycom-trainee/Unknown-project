import React from 'react';
import { View } from 'react-native';
import * as d from '../../utilities/Tranform';

const Card = props => (
  <View
    style={{
      backgroundColor: '#FFFFFF',
      borderRadius: 5,
      flexDirection: 'row',
      marginHorizontal: 30 * d.ratioW,
      marginTop: 25 * d.ratioH,
    }}
  >
    {/* eslint-disable-next-line */}
    {props.children}
  </View>
);

export default Card;
