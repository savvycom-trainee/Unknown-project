import { StyleSheet } from 'react-native';
import { Colors } from '../themes';

export default StyleSheet.create({
  viewBGTabar: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewPointBGsmall: {
    width: 56.5,
    height: 55,
    borderRadius: 30,
    backgroundColor: Colors.default,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewPointBG: {
    width: 75,
    height: 75,
    borderRadius: 45,
    backgroundColor: Colors.defaultOpacity,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
