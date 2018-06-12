import { AsyncStorage } from 'react-native';
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

export function fetchDatagetNewFeed(userId) {
  return (dispatch) => {
    const db = firebase.database();
    const userRef = db.ref(`/root/users/${userId}/following`);
    const postRef = db.ref('/root/posts');
    let returnArr = [];
    dispatch(getNewFeed());
    try {
      postRef
        .orderByChild('idUser')
        .equalTo(`${userId}`)
        .on('value', (snapshot) => {
          console.log(snapshot);
          snapshot.forEach((item) => {
            returnArr = [...returnArr, item._value];
          });
        });
      userRef.once('value').then((snapshot) => {
        if (snapshot._value) {
          snapshot._value.forEach((value) => {
            postRef
              .orderByChild('idUser')
              .equalTo(`${value}`)
              .once('value')
              .then((postSnapshot) => {
                postSnapshot.forEach((item) => {
                  returnArr = [...returnArr, item._value];
                });
                dispatch(getNewFeedSuccess(returnArr));
              });
          });
        } else {
          dispatch(getNewFeedSuccess(returnArr));
        }
      });
    } catch (error) {
      console.log(error);
      dispatch(getNewFeedFail(error));
    }
  };
}
