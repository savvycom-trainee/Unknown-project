import * as d from '../../utilities/Tranform';

const styles = {
  circleMarkerStyle: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(63, 175, 40, 0.2)',
  },
  smallMarkerLocation: {
    height: 20,
    width: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(63, 175, 40, 0.2)',
  },
  smallCenterMarker: {
    height: 10 * d.ratioH,
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
