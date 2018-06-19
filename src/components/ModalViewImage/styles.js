import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  viewImageBG: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  ImageBG: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  viewButton: {
    zIndex: 12,
    position: 'absolute',
    padding: 30,
    height: 30,
    width: 30,
  },
  viewButtonForm: {
    position: 'absolute',
    flex: 1,
    zIndex: 20,
    backgroundColor: 'transparent',
    justifyContent: 'flex-start',
  },
});
