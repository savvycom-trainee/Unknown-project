import { StyleSheet } from 'react-native';
import * as d from '../../utilities/Tranform';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 30,
    textAlign: 'center',
  },
  checkBox: {
    width: '100%',
    height: 40 * d.ratioH,
    marginBottom: 10 * d.ratioH,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageView: {
    marginTop: 31 * d.ratioH,
    width: 120 * d.ratioW,
    height: 110 * d.ratioH,
    borderColor: 'grey',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 110 * d.ratioW,
    height: 100 * d.ratioH,
  },
  topView: {
    width: '100%',
    marginTop: 20,
    height: 177 * d.ratioH,
    alignItems: 'center',
  },
  botView: {
    marginTop: 24 * d.ratioH,
    height: 470 * d.ratioH,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 50 * d.ratioW,
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
  btnSubmit: {
    height: 50 * d.ratioH,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 17,
    borderRadius: 5,
    backgroundColor: 'rgb(76, 196, 57)',
  },
  txtSubmit: {
    fontSize: 14,
    color: 'white',
  },
  btnPass: {
    height: 50 * d.ratioH,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    flexDirection: 'row',
  },
  txtPass: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgb(76, 196, 57)',
  },
});

export default styles;
