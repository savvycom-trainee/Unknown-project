import { StyleSheet } from 'react-native';
import * as d from '../../../../utilities/Tranform';

const card = StyleSheet.create({
  container: {
    width: 183.5 * d.ratioW,

    marginLeft: 7.5 * d.ratioW,
    paddingLeft: 17.5 * d.ratioW,
  },
  imageView: {
    width: 166 * d.ratioW,
    height: 82 * d.ratioH,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  infoView: {
    padding: 10,
    backgroundColor: 'white',
    width: 166 * d.ratioW,
    paddingTop: 14.5 * d.ratioH,
    paddingLeft: 15 * d.ratioW,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgb(82, 82, 82)',
  },
  status: {
    color: 'rgb(66, 183, 42)',
    fontSize: 9,
    lineHeight: 9,
    width: 50,
  },
  dot: {
    textAlign: 'center',
    lineHeight: 9,
    fontWeight: 'bold',
    alignItems: 'center',
    marginHorizontal: 7 * d.ratioW,
  },
  distance: {
    fontSize: 9,
    lineHeight: 9,
  },
  statusView: {
    width: 80.5 * d.ratioW,
    flexDirection: 'row',
    marginTop: 8.5 * d.ratioH,
  },
  circle: {
    width: 35 * d.ratioH,
    height: 35 * d.ratioH,
    borderRadius: 17.5 * d.ratioH,
    position: 'absolute',
    top: 64.5 * d.ratioH,
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
});

export default card;
