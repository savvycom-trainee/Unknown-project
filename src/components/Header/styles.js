import { StyleSheet, Platform } from 'react-native';
import { isIphoneX } from '../../utilities/device';
import * as d from '../../utilities/Tranform';

const styles = StyleSheet.create({
  container: {
    width: d.windowSize.width,
    height: d.navBarHeight,
    backgroundColor: '#FFFFFF',
    // elevation: 6,
    // shadowColor: 'rgba(0,0,0,0.6)',
    // shadowOffset: { width: 0, height: 0 },
    // shadowOpacity: 0.4,
    // shadowRadius: 20,
  },
  headerComponent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop:
      /* eslint-disable */
      Platform.OS === 'ios'
        ? isIphoneX() === true
          ? 1.3 * d.statusBarHeight
          : 1.7 * d.statusBarHeight
        : d.statusBarHeight,
    paddingHorizontal: 30 * d.ratioW,
    /* eslint-enable */
  },
  leftHeaderStyle: {
    width: 50 * d.ratioW,
    height: 30 * d.ratioH,
  },
  rightHeaderStyle: {
    alignItems: 'center',
    width: 50 * d.ratioW,
    height: 30 * d.ratioH,
  },
});

export default styles;
