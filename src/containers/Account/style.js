import { StyleSheet } from 'react-native';
import * as d from '../../utilities/Tranform';
import Color from '../../themes/Colors';

const account = StyleSheet.create({
  container: {
    flex: 1,
  },
  topView: {
    height: 302.5 * d.ratioH,
    alignItems: 'center',
  },
  back: {
    height: 19 * d.ratioH,
    width: 28 * d.ratioW,
  },
  title: {
    fontWeight: '600',
    fontSize: 14,
  },
  menu: {
    position: 'absolute',
    zIndex: 10,
    top: 20 * d.ratioH,
    right: 0,
    width: 100 * d.ratioW,
    backgroundColor: '#e5e5e5',
    borderLeftColor: 'grey',
    borderLeftWidth: 1,
  },
  menuItem: {
    paddingHorizontal: 5,
    marginHorizontal: 10,
    paddingVertical: 10,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  info: {
    marginTop: 12.5 * d.ratioH,
    alignItems: 'center',
  },
  formCanotData: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  avatar: {
    width: 110 * d.ratioW,
    height: 100 * d.ratioH,
    marginBottom: 20 * d.ratioH,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    backgroundColor: 'red',
  },
  detail: {
    fontSize: 12,
    lineHeight: 12,
  },
  btnFollow: {
    position: 'absolute',
    borderRadius: 2.5,
    left: 112.5 * d.ratioW,
    bottom: 0,
    height: 40 * d.ratioH,
    width: 150 * d.ratioW,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.default,
    flexDirection: 'row',
    zIndex: 2,
  },
  imageFollow: {
    height: 23.5 * d.ratioH,
    width: 22.5 * d.ratioW,
    marginRight: 9 * d.ratioW,
  },
  botView: {
    marginTop: 30 * d.ratioH,
    height: 334.5 * d.ratioH,
  },
  statisticView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 15 * d.ratioW,
    height: 60 * d.ratioH,
  },
  botRestaurant: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 30 * d.ratioW,
    marginTop: 50 * d.ratioH,
    marginBottom: 25 * d.ratioH,
  },
  textNotPin: {
    fontSize: 14,
    fontWeight: '300',
    marginLeft: 30 * d.ratioW,
  },
  viewButton: {
    flexDirection: 'row',
  },
});

export default account;
