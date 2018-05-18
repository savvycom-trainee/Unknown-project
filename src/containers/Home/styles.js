import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../themes';

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
  viewMenuItem: {
    elevation: 2,
    shadowColor: 'rgba(0,0,0,0.6)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemMenu: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2.5,
    height: 95,
    width: 95,
    backgroundColor: Colors.white,
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
    borderRadius: 2.5,
    backgroundColor: Colors.white,
    height: Metrics.screenHeight / 2.3,
  },
  formItemText: {
    padding: 25.5,
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
