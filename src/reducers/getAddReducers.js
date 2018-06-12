import { GET_ADD_ING, GET_ADD_SUCCESS, GET_ADD_FAIL } from '../constants/actionTypes';

const INIT_STATE = {
  isFetching: false,
  error: false,
  data: [],
  dataSuccess: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ADD_ING:
      return {
        ...state,
        isFetching: true,
      };
    case GET_ADD_SUCCESS:
      return {
        ...state,
        isFetching: false,
        dataSuccess: true,
        data: action.payload,
      };
    case GET_ADD_FAIL:
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
