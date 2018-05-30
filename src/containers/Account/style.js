import { StyleSheet } from 'react-native';
import * as d from '../../utilities/Tranform';
import Color from '../../themes/Colors';

const account = StyleSheet.create({
  container: {
    flex: 1,
  },
  topView: {
    height: 302.5 * d.ratioH,
    alignItems: 'center',
  },
  back: {
    width: 30 * d.ratioW,
  },
  title: {
    fontWeight: '600',
    fontSize: 14,
  },
  info: {
    marginTop: 12.5 * d.ratioH,
    alignItems: 'center',
  },
  avatar: {
    width: 110 * d.ratioW,
    height: 100 * d.ratioH,
    marginBottom: 24.5 * d.ratioH,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 14,
    marginBottom: 7,
  },
  detail: {
    fontSize: 9,
    lineHeight: 9,
  },
  btnFollow: {
    position: 'absolute',
    borderRadius: 2.5,
    left: 112.5 * d.ratioW,
    bottom: 0,
    height: 40 * d.ratioH,
    width: 150 * d.ratioW,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.default,
    flexDirection: 'row',
    zIndex: 2,
  },
  imageFollow: {
    height: 23.5 * d.ratioH,
    width: 22.5 * d.ratioW,
    marginRight: 9 * d.ratioW,
  },
});

export default account;
