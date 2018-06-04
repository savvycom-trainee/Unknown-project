import {
  POST_NEWFEED_ING,
  POST_NEWFEED_SUCCESS,
  POST_NEWFEED_FAIL,
} from '../constants/actionTypes';

const INIT_STATE = {
  isFetching: false,
  error: false,
  data: [],
  dataSuccess: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case POST_NEWFEED_ING:
      return {
        ...state,
        isFetching: true,
      };
    case POST_NEWFEED_SUCCESS:
      console.log(action);
      return {
        ...state,
        isFetching: false,
        dataSuccess: true,
      };
    case POST_NEWFEED_FAIL:
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
