import axios from 'axios';
import firebase from 'react-native-firebase';

import {
  GET_BOOKMARK_ING,
  GET_BOOKMARK_SUCCESS,
  GET_BOOKMARK_FAIL,
} from '../constants/actionTypes';

export function getBookmark() {
  return {
    type: GET_BOOKMARK_ING,
  };
}

export function getBookmarkSuccess(data) {
  return {
    type: GET_BOOKMARK_SUCCESS,
    payload: data,
  };
}
export function getBookmarkFail() {
  return {
    type: GET_BOOKMARK_FAIL,
  };
}

export function fetchDatagetBookmark(userId, restaurantId) {
  return (dispatch) => {
    dispatch(getBookmark());
    console.log('firebase');

    try {
      firebase
        .database()
        .ref(`/root/users/${userId}`)
        .on('value', (snapshot) => {
          console.log(snapshot.val());
          const dataReturn = {};
          if (snapshot.val().hasOwnProperty('bookmark')) {
            console.log('co bookmark');
          } else {
            console.log('chua co bookmark');
            const updates = [];
            updates[`/root/users/${userId}/bookmark/${restaurantId}`] = { status: false };
            firebase
              .database()
              .ref()
              .update(updates);
          }
          dispatch(getBookmarkSuccess(dataReturn));
        });
    } catch (error) {
      console.log(error);

      dispatch(getBookmarkFail(error));
    }
  };
}
