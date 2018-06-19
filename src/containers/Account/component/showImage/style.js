import { StyleSheet } from 'react-native';
import * as d from '../../../../utilities/Tranform';

const style = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    elevation: 5,
    backgroundColor: 'black',
    position: 'absolute',
    zIndex: 100,
  },
  image: {
    width: '100%',
    height: 300 * d.ratioH,
  },
  btnStyle: {
    position: 'absolute',
    top: 20 * d.ratioH,
    marginLeft: 20 * d.ratioW,
  },
});

export default style;
