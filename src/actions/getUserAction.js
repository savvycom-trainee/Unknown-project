import firebase from 'react-native-firebase';
import { GET_USER_ING, GET_USER_SUCCESS, GET_USER_FAIL } from '../constants/actionTypes';

const getUser = () => ({
  type: GET_USER_ING,
});
const getUserSuccess = data => ({
  type: GET_USER_SUCCESS,
  payload: data,
});
const getUserFail = () => ({
  type: GET_USER_FAIL,
});

const fetchDatagetUser = () => (dispatch) => {
  dispatch(getUser());
  try {
    firebase
      .database()
      .ref('/root/users')
      .on('value', (snapshot) => {
        let returnArr = [];
        snapshot.forEach((childSnapshot) => {
          const item = childSnapshot.val();
          item.key = childSnapshot.key;
          returnArr = [...returnArr, item];
        });
        const rand = returnArr.sort(() => 0.5 - Math.random());
        dispatch(getUserSuccess(rand.slice(0, 5)));
      });
  } catch (error) {
    console.log(error);
    dispatch(getUserFail(error));
  }
};

// eslint-disable-next-line
export { fetchDatagetUser };
