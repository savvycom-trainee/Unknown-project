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

            firebase
              .database()
              .ref(`/root/users/${userId}/bookmark`)
              .on('value', (snapshot1) => {
                console.log(snapshot1.val());
                const returnArr = [];
                snapshot1.forEach((item) => {
                  if (item._value.status) {
                    const arr = { key: item.key, status: item._value.status };
                    returnArr.push(arr);
                  }
                });
                console.log(returnArr.length);
                if (returnArr.length === 0) {
                  dispatch(getListBookmarkSuccess(null));
                } else {
                  data = returnArr;
                  console.log(data);

                  dispatch(getListBookmarkSuccess(data));
                }
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
