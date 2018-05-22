import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../../themes';
import * as d from '../../../utilities/Tranform';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  viewHead: {
    padding: 14,
    backgroundColor: Colors.default,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imgClose: {
    // width: 20,
    // height: 20,
  },
  textPost: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.white,
  },
  textButtonPost: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.white,
  },
  viewTextInput: {
    paddingBottom: 30 * d.ratioH,
  },
  textInput: {
    padding: 0,
    paddingLeft: 10,
    borderRadius: 2.5,
    width: 265 * d.ratioW,
    height: 50 * d.ratioH,
    borderColor: Colors.textOpacity,
    borderWidth: 1,
  },
  viewform: {
    padding: 30,
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
  viewOption: {
    paddingBottom: 30 * d.ratioH,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewItemOption: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.default,
    width: 50 * d.ratioW,
    height: 50 * d.ratioH,
  },
  viewItemImages: {
    paddingTop: 30 * d.ratioH,
    width: 265 * d.ratioW,
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: 100 * d.ratioH,
  },
  viewItemImagesList: {},
});
