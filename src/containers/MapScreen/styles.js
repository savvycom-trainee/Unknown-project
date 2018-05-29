import * as d from '../../utilities/Tranform';

const styles = {
  centerHeaderStyle: {
    fontSize: 15,
    fontWeight: '600',
  },
  directIconStyle: {
    bottom: 7,
    transform: [{ rotateZ: '90deg' }],
  },
  flatListStyle: {
    position: 'absolute',
    bottom: 25 * d.ratioH,
    paddingLeft: 40 * d.ratioW,
    left: 0,
    right: 0,
  },
  mapPinStyle: {
    width: 18 * d.ratioW,
    height: 25 * d.ratioH,
  },
  mapPinIphoneXStyle: {
    width: 22 * d.ratioW,
    height: 25 * d.ratioH,
  },
  focusingPhotoMarkerStyle: {
    height: 51,
    width: 51,
    borderRadius: 25.5,
    position: 'absolute',
    bottom: 11.5,
  },
  defaultPhotoMarkerStyle: {
    height: 34,
    width: 34,
    borderRadius: 17,
    position: 'absolute',
    bottom: 8,
  },
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default styles;
