import * as d from '../../../utilities/Tranform';
import colors from '../../../themes/Colors';

const styles = {
  cardStyle: {
    marginHorizontal: 30 * d.ratioW,
    marginTop: 25 * d.ratioH,
  },
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
    left: 90 * d.ratioW,
  },
  directIconStyle: {
    top: 3 * d.ratioH,
  },
};

export default styles;
