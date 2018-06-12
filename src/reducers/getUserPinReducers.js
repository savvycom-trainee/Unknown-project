import { GET_USERPIN_ING, GET_USERPIN_SUCCESS, GET_USERPIN_FAIL } from '../constants/actionTypes';

const INIT_STATE = {
  isFetching: false,
  error: false,
  data: [],
  dataSuccess: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_USERPIN_ING:
      return {
        ...state,
        isFetching: true,
      };
    case GET_USERPIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        dataSuccess: true,
        data: action.payload,
      };
    case GET_USERPIN_FAIL:
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
