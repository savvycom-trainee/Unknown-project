import {
  GET_ADD_SEARCH_ING,
  GET_ADD_SEARCH_SUCCESS,
  GET_ADD_SEARCH_FAIL,
} from '../constants/actionTypes';

export function getAddSearch() {
  return {
    type: GET_ADD_SEARCH_ING,
  };
}

export function getAddSearchSuccess(data) {
  return {
    type: GET_ADD_SEARCH_SUCCESS,
    payload: data,
  };
}
export function getAddSearchFail() {
  return {
    type: GET_ADD_SEARCH_FAIL,
  };
}
export function fetchDataGetAddSearch(latitude, longitude, keyword) {
  return (dispatch) => {
    dispatch(getAddSearch());
    fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyB4kVqZAVut6UvbjtMjKnM_Amg5G0qCWWQ&location=${latitude},${longitude}&radius=1000&type=restaurant&keyword=${keyword}`)
      .then(response => response.json())
      .then((responseJson) => {
        dispatch(getAddSearchSuccess(responseJson.results));
      })
      .catch((error) => {
        dispatch(getAddSearchFail(error));
      });
  };
}
