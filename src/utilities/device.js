import { Dimensions, Platform } from 'react-native';

const isIphoneX = () => {
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 812 || dimen.width === 812)
  );
};

// eslint-disable-next-line
export { isIphoneX };
