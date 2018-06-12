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
    // marginTop: 15,
    marginLeft: 30 * d.ratioW,
    height: 13 * d.ratioH,
    width: 20 * d.ratioW,
  },
  ImagesOverView: {
    height: 240 * d.ratioH,
    width: 250 * d.ratioW,
    marginLeft: 30 * d.ratioW,
    marginTop: 10 * d.ratioH,
  },

  ScrollViewImages: {},
  ViewPointWrap: {},
  ViewPoint: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50 * d.ratioH,
    width: 50 * d.ratioW,
    borderRadius: 50 * d.ratioW,
    zIndex: 5,
    position: 'absolute',
    backgroundColor: 'rgb(66,183,42)',
    transform: [{ translate: [180, -25, 0] }],

    elevation: 6,
    shadowColor: 'rgba(0,0,0,0.6)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
  },
  Point: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',
  },

  ViewContent: {
    marginLeft: 30 * d.ratioW,
    marginRight: 30 * d.ratioW,
  },

  ViewNameRestaurant: {
    marginTop: 25 * d.ratioH,
  },
  TextNameRestaurant: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgb(82,82,82)',
  },

  ViewTypeRestaurantCost: {
    flexDirection: 'row',
  },
  ViewTypeRestaurant: {
    flex: 1,
    // alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  TextTypeRestaurant: {
    fontSize: 9,
    fontWeight: 'normal',
    color: 'rgb(153,153,153)',
  },

  ViewCost: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  TextCost: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'rgb(153,153,153)',
  },
  TextCostGreen: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'rgb(66,183,42)',
  },

  ViewLocation: {
    flexDirection: 'row',
    marginTop: 10 * d.ratioH,
  },

  ViewBtnBottom: {
    flexDirection: 'row',
    marginTop: 28.5 * d.ratioH,
    justifyContent: 'space-between',
  },

  TextStatus: {
    fontSize: 10,
    fontWeight: 'normal',
    color: 'rgb(66,183,42)',
  },
  TextLocation: {
    fontSize: 10,
    fontWeight: 'normal',
    color: 'rgb(153,153,153)',
  },
});

export default styles;
