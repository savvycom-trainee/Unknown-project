import { StyleSheet } from 'react-native';
import * as d from '../../utilities/Tranform';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    width: '100%',
    height: 50 * d.ratioH,
    marginBottom: 17 * d.ratioH,
    backgroundColor: 'white',
    paddingLeft: 20,
    borderRadius: 2.5,
    elevation: 5,
    shadowColor: 'grey',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.9,
    shadowRadius: 5,
  },
  botView: {
    marginTop: 24 * d.ratioH,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 50 * d.ratioW,
    marginBottom: 17 * d.ratioH,
  },
  btnLogin: {
    height: 50 * d.ratioH,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 17,
    borderRadius: 5,
    backgroundColor: 'rgb(76, 196, 57)',
  },
  txtBtn: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default styles;
