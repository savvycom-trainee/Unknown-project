import { AsyncStorage } from 'react-native';
import Moment from 'moment';
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
function sortFunction(a, b) {
  const dateA = new Date(a.created).getTime();
  console.log(dateA);
  const dateB = new Date(b.created).getTime();
  return dateA < dateB ? 1 : -1;
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
                const DataArray = returnArr.sort(sortFunction);
                dispatch(getNewFeedSuccess(DataArray));
              });
          });
        } else {
          const DataArray = returnArr.sort(sortFunction);
          dispatch(getNewFeedSuccess(DataArray));
        }
      });
    } catch (error) {
      console.log(error);
      dispatch(getNewFeedFail(error));
    }
  };
}
