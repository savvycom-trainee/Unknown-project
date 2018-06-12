import { Dimensions, Platform } from 'react-native';
import { isIphoneX } from './device';

const iOSStatusBarHeight = isIphoneX() === true ? 44 : 20;
const statusBarHeight = Platform.OS === 'ios' ? iOSStatusBarHeight : 22;
const navBarHeight = Platform.OS === 'ios' ? 44 + statusBarHeight : 35 + statusBarHeight;
const windowSize = Dimensions.get('window');
const ratioH = windowSize.height / 667;
const ratioW = windowSize.width / 375;

export { statusBarHeight, navBarHeight, windowSize, ratioH, ratioW };
