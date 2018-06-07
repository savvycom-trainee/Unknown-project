import { GET_ADD_ING, GET_ADD_SUCCESS, GET_ADD_FAIL } from '../constants/actionTypes';

export function getAdd() {
  return {
    type: GET_ADD_ING,
  };
}

export function getAddSuccess(data) {
  return {
    type: GET_ADD_SUCCESS,
    payload: data,
  };
}
export function getAddFail() {
  return {
    type: GET_ADD_FAIL,
  };
}
export function fetchDataGetAdd(latitude, longitude) {
  // console.log('hihi', latitude);
  return (dispatch) => {
    dispatch(getAdd());
    // AIzaSyB4kVqZAVut6UvbjtMjKnM_Amg5G0qCWWQ
    fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyCthR5BEn21xBOMCGo-qqui8a9jDRNLDOk&location=${latitude},${longitude}&radius=1000&type=restaurant`)
      .then(response => response.json())
      .then((responseJson) => {
        dispatch(getAddSuccess(responseJson.results));
        // console.log(responseJson.results);
      })
      .catch((error) => {
        dispatch(getAddFail(error));
      });
  };
}
