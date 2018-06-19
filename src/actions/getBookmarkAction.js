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
    try {
      firebase
        .database()
        .ref(`/root/users/${userId}`)
        .on('value', (snapshot) => {
          console.log(snapshot.val());

          if (snapshot.val().hasOwnProperty('bookmark')) {
            console.log('co bookmark');
            if (snapshot.val().bookmark.hasOwnProperty(restaurantId)) {
              console.log('co id res');
              firebase
                .database()
                .ref(`/root/users/${userId}/bookmark/${restaurantId}/status`)
                .on('value', (snapshot1) => {
                  console.log(snapshot1.val());
                  dispatch(getBookmarkSuccess(snapshot1.val()));
                });
            } else {
              console.log('k co id res');
              firebase
                .database()
                .ref(`/root/users/${userId}/bookmark/${restaurantId}`)
                .set({ status: false });

              const data = 'false';
              dispatch(getBookmarkSuccess(data));
            }
          } else {
            console.log('chua co bookmark');

            firebase
              .database()
              .ref(`/root/users/${userId}/bookmark/${restaurantId}`)
              .set({ status: false });

            const data = 'false';
            dispatch(getBookmarkSuccess(data));
          }
        });
    } catch (error) {
      console.log(error);

      dispatch(getBookmarkFail(error));
    }
  };
}
