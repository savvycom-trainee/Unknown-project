import { StyleSheet } from 'react-native';
import * as d from '../../../../utilities/Tranform';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    position: 'absolute',
    zIndex: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    elevation: 6,
  },
  view: {
    height: '100%',
    width: '100%',
    top: 0,
  },
  menuHeader: {
    height: 200 * d.ratioH,
    width: '100%',
    overflow: 'hidden',
  },
  imageHeader: {
    position: 'absolute',
    top: -300 * d.ratioH,
    left: -140 * d.ratioW,
    height: 500 * d.ratioH,
    width: 500 * d.ratioW,
    borderRadius: 250 * d.ratioW,
  },
  animation: {
    height: '100%',
    width: 220,
    position: 'absolute',
    zIndex: 30,
    backgroundColor: '#fafafa',
    elevation: 5,
    shadowColor: 'grey',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.6,
    shadowRadius: 2.5,
  },
});

export default styles;
