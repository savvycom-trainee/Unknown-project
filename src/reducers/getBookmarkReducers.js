import {
  GET_BOOKMARK_ING,
  GET_BOOKMARK_SUCCESS,
  GET_BOOKMARK_FAIL,
} from '../constants/actionTypes';

const INIT_STATE = {
  isFetching: false,
  error: false,
  data: [],
  dataSuccess: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_BOOKMARK_ING:
      return {
        ...state,
        isFetching: true,
      };
    case GET_BOOKMARK_SUCCESS:
      // console.log(action.payload);
      return {
        ...state,
        isFetching: false,
        dataSuccess: true,
        data: action.payload,
      };
    case GET_BOOKMARK_FAIL:
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
