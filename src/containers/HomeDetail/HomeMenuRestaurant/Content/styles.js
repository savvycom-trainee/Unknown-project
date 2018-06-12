import { StyleSheet } from 'react-native';

import * as d from '../../../../utilities/Tranform';

const styles = StyleSheet.create({
  ViewMain: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    marginTop: 10 * d.ratioH,
    marginBottom: 10 * d.ratioH,
    marginLeft: 25 * d.ratioW,
    marginRight: 25 * d.ratioW,
    borderRadius: 5 * d.ratioH,
    height: 110 * d.ratioH,

    elevation: 6,
    shadowColor: 'rgba(0,0,0,0.6)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
  },
  ViewImg: {
    flex: 1,
    // backgroundColor: 'blue',
  },
  Img: {
    height: 110 * d.ratioH,
    width: 110 * d.ratioW,
  },

  ViewContent: {
    flex: 1.7,
    flexDirection: 'column',
    marginLeft: 26 * d.ratioW,
    marginRight: 23 * d.ratioW,
    marginTop: 23 * d.ratioH,
    marginBottom: 23 * d.ratioH,
    // backgroundColor: 'red',
  },

  ViewTitleCost: {
    flexDirection: 'row',
    flex: 1,
  },

  ViewDescription: {
    flex: 1,

    marginTop: 10 * d.ratioH,
  },

  ViewTitle: {
    flex: 3.2,
  },

  ViewCost: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },

  TextTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'rgb(82,82,82)',
  },

  TextCost: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'rgb(66,183,42)',
  },
  TextDescription: {
    fontSize: 9,
    fontWeight: 'normal',
    color: 'rgb(153,153,153)',
  },
});

export default styles;
