import { StyleSheet } from 'react-native';
import Colors from '../../../themes/Colors';

const login = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  cirleView: {
    width: '100%',
    height: 225,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  cirle: {
    backgroundColor: 'green',
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
  loginForm: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
  },
  form: {
    paddingTop: 15,
    width: '86%',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.01)',
    borderRadius: 10,
  },
  input: {
    width: '92%',
    height: 50,
    marginBottom: 20,
    backgroundColor: 'white',
    paddingLeft: 20,
  },
  vButton: {
    height: 130,
    width: '86%',
    marginTop: 30,
  },
  btnLogin: {
    paddingTop: 15,
    height: 60,
    width: '100%',
    alignItems: 'center',
    marginBottom: 17,
    borderRadius: 5,
    backgroundColor: Colors.default,
  },
  txtBtn: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  txtSignup: {
    fontWeight: 'bold',
    color: Colors.default,
  },
  txtBottom: {
    marginTop: 15,
    width: '100%',
    textAlign: 'center',
    padding: 10,
  },
});

export default login;
