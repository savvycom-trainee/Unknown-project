import firebase from 'react-native-firebase';
import { GET_NEWFEED_ING, GET_NEWFEED_SUCCESS, GET_NEWFEED_FAIL } from '../constants/actionTypes';

export function getNewFeed() {
  return {
    type: GET_NEWFEED_ING,
  };
}
export function getNewFeedSuccess(data) {
  return {
    type: GET_NEWFEED_SUCCESS,
    payload: data,
  };
}
export function getNewFeedFail() {
  return {
    type: GET_NEWFEED_FAIL,
  };
}
export function fetchDatagetNewFeed() {
  return (dispatch) => {
    dispatch(getNewFeed());
    try {
      firebase
        .database()
        .ref('/restaurant/restaurant')
        .on('value', (snapshot) => {
          let returnArr = [];
          snapshot.forEach((childSnapshot) => {
            const item = childSnapshot.val();
            item.key = childSnapshot.key;
            returnArr = [...returnArr, item];
            console.log(returnArr);
          });
          dispatch(getNewFeedSuccess(returnArr));
        });
    } catch (error) {
      console.log(error);

      dispatch(getNewFeedFail(error));
    }
  };
}
