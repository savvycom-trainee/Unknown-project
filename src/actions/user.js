import * as types from '../constants/actionTypes';

export const setUser = user => ({
  type: types.SET_USER,
  user,
});

export const setUserDatabase = user => ({ type: types.SET_USER_DATABASE, payload: user });

export const getPositionUser = () => {
  // eslint-disable-next-line
  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log(position);
      const { coord } = position.coords;
      return {
        type: 'success',
        data: coord,
      };
    },
    error => ({
      type: 'error',
      data: error,
    }),
  );
};
