import { StyleSheet } from 'react-native';

import * as d from '../../../../utilities/Tranform';

const styles = StyleSheet.create({
  ViewMain: {
    height: 60 * d.ratioH,
    width: 67.5 * d.ratioW,

    elevation: 10,
    shadowColor: 'rgb(189,189,189)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,

    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  iconStyle: {
    height: 18 * d.ratioH,
    width: 18 * d.ratioW,
    marginBottom: 7.5 * d.ratioH,
  },
});

export default styles;
