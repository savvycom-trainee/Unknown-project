import { StyleSheet } from 'react-native';

import * as d from '../../../utilities/Tranform';

const styles = StyleSheet.create({
  ViewMain: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  ViewHeader: {
    height: 55 * d.ratioH,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  IconBack: {
    // marginTop: 30,
    marginLeft: 30 * d.ratioW,
    height: 13 * d.ratioH,
    width: 20 * d.ratioW,
  },
  Title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
  IconSearch: {
    marginRight: 30 * d.ratioW,
    height: 17.5 * d.ratioH,
    width: 17.5 * d.ratioW,
  },
  ViewBtnAdd: {
    marginLeft: 295 * d.ratioW,
    height: 35 * d.ratioH,
    width: 35 * d.ratioW,
    borderRadius: 35 * d.ratioH,
    backgroundColor: 'rgb(66,183,42)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  BtnAdd: {
    fontSize: 17,
    color: 'white',
    // fontWeight: 'bold',
  },

  ViewContent: {
    flex: 1,
  },

  // Comment
  ViewTextYourComment: {
    marginLeft: 30 * d.ratioW,
  },
});

export default styles;
