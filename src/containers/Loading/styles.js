import { StyleSheet } from 'react-native';
import { Colors } from '../../themes';
import * as d from '../../utilities/Tranform';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  viewLogo: {
    height: 400 * d.ratioH,
  },
  viewLogoItem: {
    height: 400 * d.ratioH,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  imageLogo: {
    marginTop: 0,
  },
  viewForm: {
    paddingTop: 30 * d.ratioH,
    alignItems: 'center',
  },
  viewButton: {
    borderRadius: 2.5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 265 * d.ratioW,
    height: 50 * d.ratioH,
    backgroundColor: Colors.default,
  },
});
