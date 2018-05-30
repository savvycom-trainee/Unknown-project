import firebase from 'react-native-firebase';

import {
  GET_HOMEDETAIL_ING,
  GET_HOMEDETAIL_SUCCESS,
  GET_HOMEDETAIL_FAIL,
} from '../constants/actionTypes';

export function getHomeDetail() {
  return {
    type: GET_HOMEDETAIL_ING,
  };
}

export function getHomeDetailSuccess(data) {
  return {
    type: GET_HOMEDETAIL_SUCCESS,
    payload: data,
  };
}
export function getHomeDetailFail() {
  return {
    type: GET_HOMEDETAIL_FAIL,
  };
}

export function fetchDatagetHomeDetail(id) {
  return (dispatch) => {
    dispatch(getHomeDetail());
    try {
      firebase
        .database()
        .ref(`restaurant/restaurant/${id}`)
        .on('value', (snapshot) => {
          //   console.log('data');
          console.log(snapshot.val());

          // const returnArr = [];
          // console.log(returnArr);

          dispatch(getHomeDetailSuccess(snapshot.val()));
        });
    } catch (error) {
      console.log(error);

      dispatch(getHomeDetailFail(error));
    }
  };
}
