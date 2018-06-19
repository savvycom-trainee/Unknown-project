// import axios from 'axios';
import firebase from 'react-native-firebase';

import { GET_REVIEW_ING, GET_REVIEW_SUCCESS, GET_REVIEW_FAIL } from '../constants/actionTypes';

export function getReview() {
  return {
    type: GET_REVIEW_ING,
  };
}

export function getReviewSuccess(data) {
  return {
    type: GET_REVIEW_SUCCESS,
    payload: data,
  };
}
export function getReviewFail() {
  return {
    type: GET_REVIEW_FAIL,
  };
}

export function fetchDatagetReview(id) {
  return (dispatch) => {
    dispatch(getReview());
    console.log('firebase');
    let returnArr = [];
    firebase
      .database()
      .ref('root/posts')
      .on('value', (snapshot) => {
        console.log(snapshot.val());
        snapshot.forEach((item) => {
          // console.log(item._value.restaurantPlaceId);

          if (item._value.restaurantPlaceId == id) {
            console.log(item._value.idUser);
            // firebase.database().ref(`root/users/${item._value.ui}`);

            console.log(item._value.idUser);
            firebase
              .database()
              .ref(`/root/users/${item._value.idUser}`)
              .on('value', (snapshot2) => {
                console.log(snapshot2.val().fullName);
                item._value.userName1 = snapshot2.val().fullName;
                console.log(item._value.userName1);
              });
            returnArr = [...returnArr, item._value];
          }
        });
        console.log(returnArr);
        console.log(returnArr.length);
        if (returnArr.length === 0) {
          dispatch(getReviewSuccess(null));
        } else {
          dispatch(getReviewSuccess(returnArr));
        }
        // dispatch(getReviewSuccess(returnArr));
      });
  };
}
