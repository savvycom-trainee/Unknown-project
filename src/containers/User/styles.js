import { StyleSheet } from 'react-native';
import * as d from '../../utilities/Tranform';

const styles = StyleSheet.create({
  ViewMain: {
    flex: 1,
    flexDirection: 'column',
  },
  ViewContent: {
    marginLeft: 30 * d.ratioW,
    marginRight: 30 * d.ratioW,
  },
  back: {
    height: 19 * d.ratioH,
    width: 28 * d.ratioW,
  },
});

export default styles;
