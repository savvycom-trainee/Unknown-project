import { StyleSheet } from 'react-native';
import * as d from '../../../utilities/Tranform';
import { Colors } from '../../../themes';

const styles = StyleSheet.create({
  content_layout: {
    width: 200 * d.ratioW,
    flexDirection: 'row',
    height: 70 * d.ratioH,
    alignItems: 'center',
  },
  button: {
    borderRadius: 5,
    width: 70 * d.ratioW,
    height: 25 * d.ratioH,
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
    borderColor: 'green',
    alignSelf: 'center',
  },
  avatar: {
    width: 62 * d.ratioW,
    height: 57 * d.ratioW,
  },
  name: {
    fontSize: 16,
    color: Colors.text,
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
    borderRadius: 5 * d.ratioH,
    flexDirection: 'row',

    elevation: 4,
    shadowColor: 'rgba(0,0,0,0.6)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
  },
});

export default styles;
