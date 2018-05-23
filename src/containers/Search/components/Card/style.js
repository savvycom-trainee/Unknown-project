import { StyleSheet } from 'react-native';
import * as d from '../../../../utilities/Tranform';

const card = StyleSheet.create({
  container: {
    width: 315 * d.ratioW,
    height: 110 * d.ratioH,
    flexDirection: 'row',
  },
  image: {
    width: 110 * d.ratioH,
    height: 110 * d.ratioH,
  },
  imageView: {
    width: 135 * d.ratioH,
    height: 110 * d.ratioH,
    overflow: 'hidden',
  },
  circle: {
    width: 35 * d.ratioH,
    height: 35 * d.ratioH,
    borderRadius: 17.5 * d.ratioH,
    position: 'absolute',
    top: 37.5 * d.ratioH,
    right: 7.5 * d.ratioH,
    backgroundColor: 'rgb(66, 183, 42)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  txtCircle: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  cardInfo: {
    paddingTop: 21.5 * d.ratioH,
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgb(82, 82, 82)',
  },
});

export default card;
