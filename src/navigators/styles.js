import { StyleSheet, Platform } from 'react-native';
import { Colors } from '../themes';

export default StyleSheet.create({
  viewBGTabar: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewPointBGsmall: {
    width: Platform.OS === 'ios' ? 56 : 32,
    height: Platform.OS === 'ios' ? 56 : 32,
    borderRadius: Platform.OS === 'ios' ? 30 : 16,
    backgroundColor: Colors.default,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewPointBG: {
    width: Platform.OS === 'ios' ? 75 : 46,
    height: Platform.OS === 'ios' ? 75 : 46,
    borderRadius: Platform.OS === 'ios' ? 45 : 23,
    backgroundColor: Colors.defaultOpacity,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
