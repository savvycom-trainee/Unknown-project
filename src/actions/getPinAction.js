// import axios from 'axios';
import firebase from 'react-native-firebase';

import { GET_PIN_ING, GET_PIN_SUCCESS, GET_PIN_FAIL } from '../constants/actionTypes';

export function getPin() {
  return {
    type: GET_PIN_ING,
  };
}

export function getPinSuccess(data) {
  return {
    type: GET_PIN_SUCCESS,
    payload: data,
  };
}
export function getPinFail() {
  return {
    type: GET_PIN_FAIL,
  };
}

export function fetchDatagetPin(id) {
  return (dispatch) => {
    dispatch(getPin());
    firebase
      .database()
      .ref('root/users/')
      .on('value', (snapshot) => {
        console.log(snapshot.val());
        snapshot.forEach((item) => {
        //   // console.log(item._value.restaurantPlaceId);
        //   if (item._value.restaurantPlaceId === id) {
        //     returnArr = [...returnArr, item._value];
        //   }
        // });
        // // console.log(returnArr);

        dispatch(getReviewSuccess(returnArr));
      });
  };
}
