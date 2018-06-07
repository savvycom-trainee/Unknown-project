import { StyleSheet } from 'react-native';
import Colors from '../../../themes/Colors';
import * as d from '../../../utilities/Tranform';

const login = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  cirleView: {
    width: '100%',
    height: 218 * d.ratioH,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  cirle: {
    position: 'absolute',
    width: 650,
    height: 650,
    top: -460,
    borderRadius: 325,
    overflow: 'hidden',
  },
  image: {
    width: 650 * 1.2,
    height: 650 * 1.2,
    position: 'absolute',
    top: -30,
    left: -65,
  },
  loginForm: {
    flex: 1,
  },
  form: {
    paddingTop: 15,
    paddingLeft: 50 * d.ratioW,
    paddingRight: 50 * d.ratioW,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.01)',
    borderRadius: 10,
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 50 * d.ratioH,
    marginBottom: 17 * d.ratioH,
    backgroundColor: 'white',
    paddingLeft: 20,
    borderRadius: 3,
    elevation: 5,
  },
  vButton: {
    paddingLeft: 50 * d.ratioW,
    paddingRight: 50 * d.ratioW,
    width: '100%',
    marginTop: 30,
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
  btnfb: {
    height: 50 * d.ratioH,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: 'rgb(71, 89, 147)',
    flexDirection: 'row',
  },
  logofb: {
    width: 25,
    height: 25,
    marginRight: 12.5,
  },
  txtfb: {
    color: 'white',
  },
  txtBtn: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    flex: 1,
    alignSelf: 'center',
  },
  textSignUpContainer: {
    top: 25 * d.ratioH,
    left: -8 * d.ratioW,
  },
  txtSignup: {
    fontWeight: 'bold',
    color: Colors.default,
  },
  txtBottom: {
    marginTop: 15,
    textAlign: 'center',
    padding: 10,
  },
});

export default login;
