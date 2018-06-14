// import axios from 'axios';
import firebase from 'react-native-firebase';

import {
  GET_SEARCHRECOMEND_ING,
  GET_SEARCHRECOMEND_SUCCESS,
  GET_SEARCHRECOMEND_FAIL,
} from '../constants/actionTypes';

export function getSearchRecomend() {
  return {
    type: GET_SEARCHRECOMEND_ING,
  };
}

export function getSearchRecomendSuccess(data) {
  return {
    type: GET_SEARCHRECOMEND_SUCCESS,
    payload: data,
  };
}
export function getSearchRecomendFail() {
  return {
    type: GET_SEARCHRECOMEND_FAIL,
  };
}

export function fetchDatagetSearchRecomend() {
  return (dispatch) => {
    dispatch(getSearchRecomend());

    try {
      firebase
        .database()
        .ref('/root/restaurants')
        .on('value', (snapshot) => {
          const returnArr = [];
          // console.log(snapshot.val());
          snapshot.forEach((item) => {
            returnArr.push(item._value);
          });
          console.log(returnArr);

          dispatch(getSearchRecomendSuccess(returnArr));
        });
    } catch (error) {
      dispatch(getSearchRecomendFail(error));
    }
  };
}
