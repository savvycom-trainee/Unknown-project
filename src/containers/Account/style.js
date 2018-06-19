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
    height: '100%',
    width: '100%',
    position: 'absolute',
    zIndex: 10,
    elevation: 6,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  menuItem: {
    paddingHorizontal: 5,
    marginHorizontal: 10,
    marginVertical: 10,
    paddingVertical: 10,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    marginLeft: 5 * d.ratioW,
    fontSize: 14,
    color: 'black',
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
    marginTop: 10 * d.ratioH,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
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
  btnFollowEd: {
    position: 'absolute',
    borderRadius: 2.5,
    left: 112.5 * d.ratioW,
    bottom: 0,
    height: 40 * d.ratioH,
    width: 150 * d.ratioW,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#42bcf4',
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
