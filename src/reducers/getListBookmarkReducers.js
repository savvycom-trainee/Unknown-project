import {
  GET_LISTBOOKMARK_ING,
  GET_LISTBOOKMARK_SUCCESS,
  GET_LISTBOOKMARK_FAIL,
} from '../constants/actionTypes';

const INIT_STATE = {
  isFetching: false,
  error: false,
  data: [],
  dataSuccess: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_LISTBOOKMARK_ING:
      return {
        ...state,
        isFetching: true,
      };
    case GET_LISTBOOKMARK_SUCCESS:
      // console.log(action.payload);
      return {
        ...state,
        isFetching: false,
        dataSuccess: true,
        data: action.payload,
      };
    case GET_LISTBOOKMARK_FAIL:
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
