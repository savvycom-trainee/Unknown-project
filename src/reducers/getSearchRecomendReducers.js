import {
  GET_SEARCHRECOMEND_ING,
  GET_SEARCHRECOMEND_SUCCESS,
  GET_SEARCHRECOMEND_FAIL,
} from '../constants/actionTypes';

const INIT_STATE = {
  isFetching: false,
  error: false,
  data: [],
  dataSuccess: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_SEARCHRECOMEND_ING:
      return {
        ...state,
        isFetching: true,
      };
    case GET_SEARCHRECOMEND_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        isFetching: false,
        dataSuccess: true,
        data: action.payload,
      };
    case GET_SEARCHRECOMEND_FAIL:
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
