import {
  GET_USERFACEBOOK_ING,
  GET_USERFACEBOOK_SUCCESS,
  GET_USERFACEBOOK_FAIL,
} from '../constants/actionTypes';

export function getUserFacebook() {
  return {
    type: GET_USERFACEBOOK_ING,
  };
}

export function getUserFacebookSuccess(data) {
  return {
    type: GET_USERFACEBOOK_SUCCESS,
    payload: data,
  };
}
export function getUserFacebookFail() {
  return {
    type: GET_USERFACEBOOK_FAIL,
  };
}
export function fetchDataGetUserFBAdd(userToken) {
  return (dispatch) => {
    console.log('hihi');
    dispatch(getUserFacebook());
    fetch(`https://graph.facebook.com/v2.5/me?fields=email,name,birthday,gender,address,friends&access_token=${userToken}`)
      .then(response => response.json())
      .then((responseJson) => {
        dispatch(getUserFacebookSuccess(responseJson));
        console.log(responseJson);
      })
      .catch((error) => {
        dispatch(getUserFacebookFail(error));
      });
  };
}
