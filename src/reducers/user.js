import * as types from '../constants/actionTypes';

const defaultState = {
  user: {},
  userDatabase: {},
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case types.SET_USER_DATABASE:
      return {
        ...state,
        userDatabase: action.payload,
      };
    default:
      return state;
  }
};
