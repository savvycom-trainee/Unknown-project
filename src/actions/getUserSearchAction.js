import firebase from 'react-native-firebase';
import {
  GET_SEARCHUSER_ING,
  GET_SEARCHUSER_SUCCESS,
  GET_SEARCHUSER_FAIL,
} from '../constants/actionTypes';

const getSearchUser = () => ({
  type: GET_SEARCHUSER_ING,
});
const getSearchUserSuccess = data => ({
  type: GET_SEARCHUSER_SUCCESS,
  payload: data,
});
const getSearchUserFail = () => ({
  type: GET_SEARCHUSER_FAIL,
});

const fetchDatagetSearchUser = queryText => (dispatch) => {
  dispatch(getSearchUser());
  try {
    firebase
      .database()
      .ref('/root/users')
      .orderByChild('fullName')
      .startAt(`${queryText}`)
      .endAt(`${queryText}\uf8ff`)
      .on('value', (snapshot) => {
        let returnArr = [];
        snapshot.forEach((childSnapshot) => {
          const item = childSnapshot.val();
          item.key = childSnapshot.key;
          returnArr = [...returnArr, item];
        });
        dispatch(getSearchUserSuccess(returnArr));
      });
  } catch (error) {
    console.log(error);
    dispatch(getSearchUserFail(error));
  }
};
// eslint-disable-next-line
export { fetchDatagetSearchUser };
