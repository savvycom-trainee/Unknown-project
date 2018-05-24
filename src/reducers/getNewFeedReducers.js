import {
  GET_GET_NEWFEED_ING,
  GET_GET_NEWFEED_SUCCESS,
  GET_GET_NEWFEED_FAIL,
} from '../constants/actionTypes';

const INIT_STATE = {
  isFetching: false,
  error: false,
  data: [],
  dataSuccess: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_GET_NEWFEED_ING:
      return {
        ...state,
        isFetching: true,
      };
    case GET_GET_NEWFEED_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        isFetching: false,
        dataSuccess: true,
        data: action.payload,
      };
    case GET_GET_NEWFEED_FAIL:
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
