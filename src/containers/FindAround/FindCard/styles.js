import { StyleSheet } from 'react-native';
import * as d from '../../../utilities/Tranform';

const styles = StyleSheet.create({
  content_layout: {
    width: 265 * d.ratioW,
    flexDirection: 'row',
    height: 70 * d.ratioH,
    alignItems: 'center',
  },
  button: {
    borderRadius: 5,
    width: 50 * d.ratioH,
    height: 25 * d.ratioH,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'green',
    alignSelf: 'center',
  },
  avatar: {
    width: 62 * d.ratioW,
    height: 57 * d.ratioW,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  item_layout: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    width: 330 * d.ratioH,
    height: 107 * d.ratioH,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    margin: 5,
    borderRadius: 10,
  },
});

export default styles;
