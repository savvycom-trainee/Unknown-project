import firebase from 'react-native-firebase';
import {
  POST_NEWFEED_ING,
  POST_NEWFEED_SUCCESS,
  POST_NEWFEED_FAIL,
} from '../constants/actionTypes';

export function postNewFeed() {
  return {
    type: POST_NEWFEED_ING,
  };
}
export function postNewFeedSuccess() {
  return {
    type: POST_NEWFEED_SUCCESS,
  };
}
export function postNewFeedFail() {
  return {
    type: POST_NEWFEED_FAIL,
  };
}
export function fetchPostNewFeed(obj) {
  const UserId = '0hJcq7PHg5bXgB414nqBXl3te3g3';
  return (dispatch) => {
    dispatch(postNewFeed());
    try {
      firebase
        .database()
        .ref('restaurant/restaurant/')
        .push(obj);
      dispatch(postNewFeedSuccess());
    } catch (error) {
      dispatch(postNewFeedFail(error));
    }
  };
}
