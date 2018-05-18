import { StyleSheet } from 'react-native';
import { Colors } from '../../themes';

export default StyleSheet.create({
  viewBGTabar: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewMenu: {
    padding: 30,
  },
  viewMenuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemMenu: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2.5,
    height: 95,
    width: 95,
    backgroundColor: Colors.default,
  },
});
