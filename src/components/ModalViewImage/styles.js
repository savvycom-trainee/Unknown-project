import { StyleSheet } from 'react-native';
import { Colors } from '../../themes';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  viewImageBG: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  ImageBG: {
    flex: 1,
    resizeMode: 'center',
  },
  viewButton: {
    zIndex: 12,
    position: 'absolute',
    padding: 20,
    height: 30,
    width: 30,
  },
  viewButtonForm: {
    zIndex: 12,
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-start',
  },
});
