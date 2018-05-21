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
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  photoViewStyle: {
    borderTopLeftRadius: 2.5,
    borderBottomLeftRadius: 2.5,
    overflow: 'hidden',
  },
  directStyle: {
    position: 'absolute',
    left: 68 * d.ratioW,
  },
};

export default styles;
