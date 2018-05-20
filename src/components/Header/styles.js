import * as d from '../../utilities/Tranform';

const styles = {
  container: {
    width: d.windowSize.width,
    height: 80 * d.ratioH,
    backgroundColor: '#FFFFFF',
  },
  headerComponent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 2.15 * d.statusBarHeight,
    paddingHorizontal: 30 * d.ratioW,
  },
};

export default styles;
