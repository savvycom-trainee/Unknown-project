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
    fontWeight: '600',
    backgroundColor: 'white',
    lineHeight: 30,
    color: 'black',
    alignItems: 'center',
    flex: 1,
  },
  searchView: {
    height: 30 * d.ratioH,
    borderBottomColor: 'rgb(153, 153, 153)',
    marginBottom: 19.5 * d.ratioH,
  },
  place: {
    flexDirection: 'row',
    height: 30 * d.ratioH,
  },
  in: {
    width: 36 * d.ratioW,
  },
});

export default header;
