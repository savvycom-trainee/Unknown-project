import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../themes';
import * as d from '../../utilities/Tranform';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  viewBGTabar: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewMenu: {
    padding: Metrics.doubleBaseMargin1x,
  },
  imageContent: {
    height: 150 * d.ratioH,
    width: 315 * d.ratioW,
  },
  viewMenuItem: {
    // elevation: 6,
    // shadowColor: 'rgba(0,0,0,0.6)',
    // shadowOffset: { width: 0, height: 0 },
    // shadowOpacity: 0.4,
    // shadowRadius: 20,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemMenu: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2.5,
    height: 95 * d.ratioH,
    width: 95 * d.ratioW,
    backgroundColor: Colors.white,
  },
  viewPointForm: {
    backgroundColor: 'red',
    zIndex: 12,
    transform: [{ translate: [-15, 0, 0] }],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  viewPoint: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.default,
    height: 50,
    width: 50,
    borderRadius: 25,
    position: 'absolute',
  },
  itemMenuIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.default,
    borderRadius: 25,
    height: 50,
    width: 50,
  },
  viewContentForm: {
    paddingLeft: Metrics.doubleBaseMargin1x,
    paddingRight: Metrics.doubleBaseMargin1x,
  },
  formItem: {
    marginBottom: 25,
    borderRadius: 2.5,
    backgroundColor: Colors.white,
    width: 315 * d.ratioW,
    height: Metrics.screenHeight / 2.3,
  },
  formItemText: {
    padding: 25.5,
  },
  textPoint: {
    fontSize: 15,
    color: Colors.white,
    fontWeight: '800',
  },
  textName: {
    fontSize: 18,
    color: Colors.text,
    fontWeight: '800',
  },
  viewNameRow2: {
    paddingBottom: 23.5,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  viewNameRow3: {
    width: '90%',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  viewNameRow1: {
    paddingBottom: 14.5,
  },
  textNameRow2: {
    fontSize: 11,
    color: Colors.textOpacity,
    fontWeight: '700',
  },
  textNameRow2Flowed: {
    fontSize: 11,
    color: Colors.default,
    fontWeight: '700',
  },
  viewNameRow2Item: {
    flexDirection: 'row',
  },
});
