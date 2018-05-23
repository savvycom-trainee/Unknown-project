import { StyleSheet } from 'react-native';
import * as d from '../../utilities/Tranform';

const search = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 136 * d.ratioH,
  },
  resultView: {},
  title: {
    fontSize: 14,
    marginLeft: 30 * d.ratioW,
    fontWeight: '600',
    marginTop: 49.5 * d.ratioH,
  },
  opacity: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.5)',
    height: 95 * d.ratioH,
    width: 315 * d.ratioW,
    marginLeft: 30 * d.ratioW,
  },
});

export default search;
