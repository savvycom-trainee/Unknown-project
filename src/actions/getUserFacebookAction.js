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
export async function fetchDataGetUserFBAdd(userToken) {
  console.log(userToken);
  const reponse = await fetch(`https://graph.facebook.com/v2.8/me?fields=email,birthday,hometown,gender,picture&access_token=${userToken}`);
  const json = await reponse.json();
  return json;
}
