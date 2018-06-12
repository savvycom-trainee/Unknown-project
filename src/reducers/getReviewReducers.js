import { GET_REVIEW_ING, GET_REVIEW_SUCCESS, GET_REVIEW_FAIL } from '../constants/actionTypes';

const INIT_STATE = {
  isFetching: false,
  error: false,
  data: [],
  dataSuccess: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_REVIEW_ING:
      return {
        ...state,
        isFetching: true,
      };
    case GET_REVIEW_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        isFetching: false,
        dataSuccess: true,
        data: action.payload,
      };
    case GET_REVIEW_FAIL:
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
