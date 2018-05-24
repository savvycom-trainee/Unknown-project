import { StyleSheet } from 'react-native';
import * as d from '../../../../utilities/Tranform';

const header = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 30 * d.ratioW,
    paddingTop: 30 * d.ratioH,
  },
  input: {
    fontWeight: '600',
    backgroundColor: 'transparent',
    lineHeight: 15,
    paddingTop: 0,
    color: 'grey',
    flex: 1,
  },
  searchView: {
    height: 30 * d.ratioH,
    borderBottomColor: 'rgb(153, 153, 153)',
    borderBottomWidth: 1,
    marginBottom: 19.5 * d.ratioH,
  },
  place: {
    flexDirection: 'row',
    height: 30 * d.ratioH,
  },
  borderBottom: {
    flex: 1,
    borderBottomColor: 'rgb(153, 153, 153)',
    borderBottomWidth: 1,
  },
  in: {
    width: 36 * d.ratioW,
    lineHeight: 13,
    fontSize: 13,
  },
});

export default header;
