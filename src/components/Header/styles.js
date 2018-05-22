import * as d from '../../utilities/Tranform';

const styles = {
  container: {
    width: d.windowSize.width,
    height: d.navBarHeight,
    backgroundColor: '#FFFFFF',
  },
  headerComponent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 1.7 * d.statusBarHeight,
    paddingHorizontal: 30 * d.ratioW,
  },
  leftHeaderStyle: {
    marginTop: 2 * d.ratioH,
  },
};

export default styles;
