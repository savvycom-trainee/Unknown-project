import * as d from '../../../utilities/Tranform';
import colors from '../../../themes/Colors';

const styles = {
  detailContainer: {
    justifyContent: 'space-evenly',
    paddingLeft: 25 * d.ratioW,
  },
  restaurantNameStyle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  bodyDetailStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 160 * d.ratioW,
  },
  restaurantTypeStyle: {
    fontSize: 10,
    color: colors.textOpacity,
    fontWeight: '700',
  },
  photoContainerStyle: {
    justifyContent: 'center',
    zIndex: 1,
  },
  photoViewStyle: {
    borderTopLeftRadius: 2.5,
    borderBottomLeftRadius: 2.5,
    overflow: 'hidden',
  },
  directStyle: {
    alignSelf: 'center',
    left: 93 * d.ratioW,
    // right: -19.5 * d.ratioW,
    // left:
    // transform: [{ translate: [-195, -35, 0] }],
  },
};

export default styles;
