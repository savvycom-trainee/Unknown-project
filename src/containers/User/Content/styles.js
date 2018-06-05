import { StyleSheet } from 'react-native';
import * as d from '../../../utilities/Tranform';
// import Colors from '../../../themes';

const styles = StyleSheet.create({
  ViewMain: {
    flex: 1,
    marginLeft: 30 * d.ratioW,
    marginRight: 30 * d.ratioW,
    marginTop: 10 * d.ratioH,
    marginBottom: 15 * d.ratioH,
    backgroundColor: 'white',
    padding: 20 * d.ratioH,
    flexDirection: 'row',
    borderRadius: 5 * d.ratioH,
  },
  ViewAge: {
    paddingTop: 4 * d.ratioH,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {},
  ViewAvatar: {
    // borderRadius: 10,
    flex: 1,
    width: 62.5 * d.ratioW,
    height: 57.5 * d.ratioH,
    marginRight: 14.5 * d.ratioW,
  },
  Avatar: {
    width: 60 * d.ratioW,
    height: 60 * d.ratioH,
    borderRadius: 30 * d.ratioH,
  },
  ViewContent: {
    // backgroundColor: 'red',
    flex: 3,
  },
  // follow
  ViewFollow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'space-between',
  },
  ViewFollowNameTime: {},
  ViewBTN: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  ViewFollowBtn: {
    marginTop: 5 * d.ratioH,
    marginRight: 5 * d.ratioW,
    padding: 2 * d.ratioH,
    borderColor: 'rgb(66,183,42)',
    borderWidth: 1 * d.ratioW,
    borderRadius: 2 * d.ratioH,
  },
  TextName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'rgb(82,82,82)',
  },
  TextFollowYou: {
    fontSize: 13,
    fontWeight: 'normal',
    color: 'rgb(82,82,82)',
  },
  TextTime: {
    paddingLeft: 10 * d.ratioW,
    // marginTop: 5 * d.ratioH,
    fontSize: 11,
    fontWeight: '800',
    color: 'rgb(153,153,153)',
  },

  TextBtnFollow: {
    fontSize: 9,
    fontWeight: 'normal',
    color: 'rgb(66,183,42)',
  },
  TextHightlight: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'rgb(66,183,42)',
  },
});

export default styles;
