import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('screen');
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'yellow',
    zIndex: 2,
  },
});

export default styles;
