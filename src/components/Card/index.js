import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import * as d from '../../utilities/Tranform';

const Card = (props, { onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      backgroundColor: '#FFFFFF',
      borderRadius: 2.5,
      flexDirection: 'row',
      marginHorizontal: 30 * d.ratioW,
      marginTop: 25 * d.ratioH,
    }}
  >
    {/* <View
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 2.5,
        flexDirection: 'row',
        marginHorizontal: 30 * d.ratioW,
        marginTop: 25 * d.ratioH,
      }}
    > */}
    {/* eslint-disable-next-line */}
    {props.children}
    {/* </View> */}
  </TouchableOpacity>
);

export default Card;
