import { StyleSheet } from 'react-native';
import * as d from '../../utilities/Tranform';

const search = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 136 * d.ratioH,
  },
  resultView: {},
  title: {
    fontSize: 14,
    color: 'black',
    marginLeft: 30 * d.ratioW,
    fontWeight: '600',
    marginTop: 49.5 * d.ratioH,
    marginBottom: 25 * d.ratioH,
  },
  opacity: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.5)',
    height: 95 * d.ratioH,
    width: 315 * d.ratioW,
    marginLeft: 30 * d.ratioW,
  },
});

const header = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 30 * d.ratioW,
    paddingTop: 30 * d.ratioH,
    height: 136 * d.ratioH,
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

export { search, header };
