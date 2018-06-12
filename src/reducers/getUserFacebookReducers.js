import {
  GET_USERFACEBOOK_ING,
  GET_USERFACEBOOK_SUCCESS,
  GET_USERFACEBOOK_FAIL,
} from '../constants/actionTypes';

const INIT_STATE = {
  isFetching: false,
  error: false,
  data: [],
  dataSuccess: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_USERFACEBOOK_ING:
      return {
        ...state,
        isFetching: true,
      };
    case GET_USERFACEBOOK_SUCCESS:
      // console.log(action.payload);
      return {
        ...state,
        isFetching: false,
        dataSuccess: true,
      };
    case GET_USERFACEBOOK_FAIL:
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
