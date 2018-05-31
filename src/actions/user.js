import * as types from '../constants/actionTypes';

export const setUser = user => ({
  type: types.SET_USER,
  user,
});

export const setUserDatabase = user => ({ type: types.SET_USER_DATABASE, payload: user });
