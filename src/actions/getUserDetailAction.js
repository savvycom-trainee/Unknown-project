import firebase from 'react-native-firebase';

import {
  GET_USERDETAIL_ING,
  GET_USERDETAIL_SUCCESS,
  GET_USERDETAIL_FAIL,
} from '../constants/actionTypes';

export function getUserDetail() {
  return {
    type: GET_USERDETAIL_ING,
  };
}

export function getUserDetailSuccess(data) {
  return {
    type: GET_USERDETAIL_SUCCESS,
    payload: data,
  };
}
export function getUserDetailFail() {
  return {
    type: GET_USERDETAIL_FAIL,
  };
}

export function fetchDatagetUserDetail(id) {
  return (dispatch) => {
    dispatch(getUserDetail());
    try {
      firebase
        .database()
        .ref(`root/users/${id}`)
        .on('value', (snapshot) => {
          console.log(snapshot.val());
          dispatch(getUserDetailSuccess(snapshot.val()));
        });
    } catch (error) {
      console.log(error);

      dispatch(getUserDetailFail(error));
    }
  };
}
