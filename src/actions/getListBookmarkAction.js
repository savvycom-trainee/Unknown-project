// import axios from 'axios';
import firebase from 'react-native-firebase';

import {
  GET_LISTBOOKMARK_ING,
  GET_LISTBOOKMARK_SUCCESS,
  GET_LISTBOOKMARK_FAIL,
} from '../constants/actionTypes';

export function getListBookmark() {
  return {
    type: GET_LISTBOOKMARK_ING,
  };
}

export function getListBookmarkSuccess(data) {
  return {
    type: GET_LISTBOOKMARK_SUCCESS,
    payload: data,
  };
}
export function getListBookmarkFail() {
  return {
    type: GET_LISTBOOKMARK_FAIL,
  };
}

export function fetchDatagetListBookmark(userId) {
  return (dispatch) => {
    dispatch(getListBookmark());

    try {
      firebase
        .database()
        .ref(`/root/users/${userId}`)
        .on('value', (snapshot) => {
          console.log(snapshot.val());
          const checkHaveBookmark = snapshot.val().hasOwnProperty('bookmark');
          console.log(checkHaveBookmark);

          if (checkHaveBookmark) {
            let data = null;
            const returnArr = [];
            firebase
              .database()
              .ref(`/root/users/${userId}/bookmark`)
              .on('value', (snapshot1) => {
                console.log(snapshot1.val());
                snapshot1.forEach((item) => {
                  const arr = { key: item.key, status: item._value.status };
                  returnArr.push(arr);
                });
                console.log(returnArr);
                data = returnArr;
                dispatch(getListBookmarkSuccess(data));
              });
            dispatch(getListBookmarkSuccess(data));
          } else {
            const data = null;
            dispatch(getListBookmarkSuccess(data));
          }
        });
    } catch (error) {
      dispatch(getListBookmarkFail(error));
    }
  };
}
