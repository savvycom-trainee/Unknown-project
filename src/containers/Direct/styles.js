import * as d from '../../utilities/Tranform';
import { Colors } from '../../themes';
import { isIphoneX } from '../../utilities/device';

const styles = {
  cardStyle: {
    bottom: 30 * d.ratioH,
    position: 'absolute',
    alignSelf: 'center',
    width: 315 * d.ratioW,
  },
  firstViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4CB23E',
    borderTopLeftRadius: 2.5,
    borderBottomLeftRadius: 2.5,
    height: 75 * d.ratioH,
    width: 75 * d.ratioW,
  },
  secondViewStyle: {
    justifyContent: 'space-evenly',
    paddingHorizontal: 25 * d.ratioW,
  },
  detailStyle: {
    flexDirection: 'row',
  },
  travelTimeStyle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  distanceStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textOpacity,
    paddingLeft: 5,
  },
  directStyle: {
    top: 3 * d.ratioH,
  },
  textStyle: {
    fontSize: 10,
    color: Colors.textOpacity,
  },
  circleMarkerStyle: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(63, 175, 40, 0.2)',
  },
  smallMarkerLocation: {
    height: 20 * d.ratioH,
    width: 20 * d.ratioW,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(63, 175, 40, 0.2)',
  },
  smallCenterMarker: {
    height:10 * d.ratioH,
    width: 10 * d.ratioW,
    borderRadius: 5,
    backgroundColor: 'rgb(63, 175, 40)',
  },
  userMarker: {
    height: 120 * d.ratioH,
    width: 120 * d.ratioW,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  largeMarker: {
    height: 100 * d.ratioH,
    width: 100 * d.ratioW,
    borderRadius: 50,
  },
  mediumMarker: {
    height: 75 * d.ratioH,
    width: 75 * d.ratioW,
    borderRadius: 37.5,
  },
  smallMarker: {
    height: 50 * d.ratioH,
    width: 50 * d.ratioW,
    borderRadius: 25,
  },
  userImageMarker: {
    height: 25 * d.ratioH,
    width: 25 * d.ratioW,
    borderRadius: 12.5,
  },
};

export default styles;
