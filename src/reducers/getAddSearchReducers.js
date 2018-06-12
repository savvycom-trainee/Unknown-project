import {
  GET_ADD_SEARCH_ING,
  GET_ADD_SEARCH_SUCCESS,
  GET_ADD_SEARCH_FAIL,
} from '../constants/actionTypes';

const INIT_STATE = {
  isFetching: false,
  error: false,
  data: [],
  dataSuccess: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ADD_SEARCH_ING:
      return {
        ...state,
        isFetching: true,
      };
    case GET_ADD_SEARCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        dataSuccess: true,
        data: action.payload,
      };
    case GET_ADD_SEARCH_FAIL:
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
