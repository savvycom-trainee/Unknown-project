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

export function fetchDatagetSearchRecomend(queryText) {
  return (dispatch) => {
    dispatch(getSearchRecomend());

    try {
      firebase
        .database()
        .ref('/root/restaurants')
        .orderByChild('name')
        .startAt(`${queryText}`)
        .endAt(`${queryText}\uf8ff`)
        .on('value', (snapshot) => {
          console.log(snapshot.val());

          let returnArr = [];
          snapshot.forEach((childSnapshot) => {
            const item = childSnapshot.val();
            item.key = childSnapshot.key;
            returnArr = [...returnArr, item];
          });
          console.log(returnArr);

          dispatch(getSearchRecomendSuccess(returnArr));
        });
    } catch (error) {
      dispatch(getSearchRecomendFail(error));
    }
  };
}
