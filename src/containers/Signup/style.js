import { StyleSheet } from 'react-native';
import Colors from '../../themes/Colors';
import * as d from '../../utilities/Tranform';

const signup = StyleSheet.create({
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
    width: '120%',
    height: '120%',
    position: 'absolute',
    top: -30,
    left: '-10%',
  },
  signupForm: {
    width: '100%',
    height: '100%',
  },
  form: {
    paddingTop: 15,
    paddingLeft: 50 * d.ratioW,
    paddingRight: 50 * d.ratioW,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.01)',
    borderRadius: 10,
  },
  input: {
    width: '100%',
    height: 50 * d.ratioH,
    marginBottom: 17 * d.ratioH,
    backgroundColor: 'white',
    paddingLeft: 20,
  },
  vButton: {
    paddingLeft: 50 * d.ratioW,
    paddingRight: 50 * d.ratioW,
    width: '100%',
    marginTop: 30,
  },
  btnsignup: {
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
  textContainer: {
    flexDirection: 'row',
    flex: 1,
    alignSelf: 'center',
  },
  textSignUpContainer: {
    top: 10 * d.ratioH,
    left: -8 * d.ratioW,
  },
  txtSignUp: {
    fontWeight: 'bold',
    color: Colors.default,
  },
  txtBottom: {
    textAlign: 'center',
    padding: 10,
  },
});

export default signup;
