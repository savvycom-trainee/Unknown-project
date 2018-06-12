import { StyleSheet } from 'react-native';
import { Colors } from '../../themes';
import * as d from '../../utilities/Tranform';

const styles = StyleSheet.create({
  ViewMain: {
    flex: 1,
    flexDirection: 'column',
  },
  ViewContent: {
    marginLeft: 30 * d.ratioW,
    marginRight: 30 * d.ratioW,
  },
  back: {
    height: 19 * d.ratioH,
    width: 28 * d.ratioW,
  },
  viewFromSearch: {
    padding: 10,
    // backgroundColor: 'red',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonSearch: {
    paddingRight: 5 * d.ratioW,
  },
  ViewButtonSearch: {
    padding: 3,
  },
  viewTextInputSearch: {
    paddingBottom: 10 * d.ratioH,
  },
  textInputSearch: {
    color: Colors.default,
    padding: 0,
    paddingLeft: 10,
    borderRadius: 2.5,
    width: 265 * d.ratioW,
    height: 40 * d.ratioH,
    borderBottomColor: Colors.default,
    borderBottomWidth: 0.3,
  },
  viewFlatList: {},
  viewDataUser: {
    alignItems: 'center',
  },
  textFindUser: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.text,
  },
  viewLoad: {
    paddingTop: 30 * d.ratioH,
  },
});

export default styles;
