import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../../themes';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  viewImageBG: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  ImageBG: {
    flex: 1,
    resizeMode: 'center',
  },
  imagePhotoItem4: {
    height: Metrics.screenHeight / 4,
    width: Metrics.screenWidth,
  },
  imagePhotoItem3: {
    height: Metrics.screenHeight / 2,
    width: Metrics.screenWidth,
  },
  viewButton: {
    padding: 20,
    zIndex: 12,
    position: 'absolute',
    height: 30,
    width: 30,
  },
  viewButtonForm: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-start',
  },
});
