import { GET_POSITION_SUCCESS, GET_POSITION_FAIL } from '../constants/actionTypes';

export const getPositionSuccess = coords => ({
  type: GET_POSITION_SUCCESS,
  payload: coords,
});

export const getPositionFail = () => ({
  type: GET_POSITION_FAIL,
});
