import {
  GET_SEARCHUSER_ING,
  GET_SEARCHUSER_SUCCESS,
  GET_SEARCHUSER_FAIL,
} from '../constants/actionTypes';

const INIT_STATE = {
  isFetching: false,
  error: false,
  data: [],
  dataSuccess: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_SEARCHUSER_ING:
      return {
        ...state,
        isFetching: true,
      };
    case GET_SEARCHUSER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        dataSuccess: true,
        data: action.payload,
      };
    case GET_SEARCHUSER_FAIL:
      return {
        ...state,
        isFetching: false,
        dataSuccess: false,
        error: true,
      };
    default:
      return state;
  }
};
