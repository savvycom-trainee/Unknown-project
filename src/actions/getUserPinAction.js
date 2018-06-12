import firebase from 'react-native-firebase';
import { GET_USERPIN_ING, GET_USERPIN_SUCCESS, GET_USERPIN_FAIL } from '../constants/actionTypes';

const getUserPin = () => ({
  type: GET_USERPIN_ING,
});
const getUserPinSuccess = data => ({
  type: GET_USERPIN_SUCCESS,
  payload: data,
});
const getUserPinFail = () => ({
  type: GET_USERPIN_FAIL,
});

const fetchDataGetUserPin = userId => (dispatch) => {
  const db = firebase.database();
  const postRef = db.ref('/root/posts');
  let returnArr = [];
  dispatch(getUserPin());
  try {
    postRef
      .orderByChild('idUser')
      .equalTo(`${userId}`)
      .on('value', (snapshot) => {
        snapshot.forEach((item) => {
          returnArr = [...returnArr, item._value];
        });
        dispatch(getUserPinSuccess(returnArr));
      });
  } catch (error) {
    console.log(error);
    dispatch(getUserPinFail(error));
  }
};

// eslint-disable-next-line
export { fetchDataGetUserPin };
