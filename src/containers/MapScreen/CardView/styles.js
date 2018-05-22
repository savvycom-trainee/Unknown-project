import * as d from '../../../utilities/Tranform';
import colors from '../../../themes/Colors';

const styles = {
  restaurantPhotoContainer: {
    overflow: 'hidden',
    borderTopLeftRadius: 2.5,
    borderTopRightRadius: 2.5,
  },
  restaurantPhotoStyle: {
    height: 100 * d.ratioH,
    width: 190 * d.ratioW,
  },
  ratingTextStyle: {
    fontWeight: '700',
    color: '#FFFFFF',
  },
  restaurantDetailContainer: {
    marginHorizontal: 15 * d.ratioW,
    marginVertical: 12 * d.ratioH,
  },
  restaurantNameStyle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
    paddingBottom: 5 * d.ratioH,
  },
};

export default styles;
