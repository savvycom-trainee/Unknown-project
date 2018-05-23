import { StyleSheet } from 'react-native';
import * as d from '../../../../utilities/Tranform';

const header = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    paddingHorizontal: 30 * d.ratioW,
    paddingTop: 30 * d.ratioH,
  },
  input: {
    height: 30,
    fontWeight: '600',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  place: {
    flexDirection: 'row',
  },
});

export default header;
