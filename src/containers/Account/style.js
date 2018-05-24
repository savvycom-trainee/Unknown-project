import { StyleSheet } from 'react-native';
import * as d from '../../utilities/Tranform';

const account = StyleSheet.create({
  container: {
    flex: 1,
  },
  topView: {
    backgroundColor: 'white',
    height: 282.5 * d.ratioH,
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
});

export default account;
