import * as d from '../../../utilities/Tranform';
import colors from '../../../themes/Colors';

const styles = {
  cardStyle: {
    marginHorizontal: 30 * d.ratioW,
    marginTop: 10 * d.ratioH,
    marginBottom: 10 * d.ratioH,

    elevation: 4,
    shadowColor: 'rgba(0,0,0,0.6)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
  },
  detailContainer: {
    justifyContent: 'space-evenly',
    paddingLeft: 25 * d.ratioW,
  },
  restaurantNameStyle: {
    fontSize: 13,
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
