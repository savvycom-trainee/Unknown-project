import { StyleSheet } from 'react-native';
import { Colors } from '../../../../themes';
import * as d from '../../../../utilities/Tranform';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
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
    padding: 20,
    height: 30,
    width: 30,
  },
  viewButtonForm: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-start',
  },
});
