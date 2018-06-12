import { GET_POSITION_SUCCESS, GET_POSITION_FAIL } from '../constants/actionTypes';

const INIT_STATE = {
  coords: {
    latitude: 21.025817,
    longitude: 105.800344,
    latitudeDelta: 0.0301,
    longitudeDelta: 0.0304,
  },
  err: null,
};

const getPositionReducers = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_POSITION_SUCCESS: {
      console.log(`action ${action}`);
      return action.payload;
    }
    case GET_POSITION_FAIL: {
      console.log(`action ${action}`);
      return INIT_STATE;
    }
    default:
      return state;
  }
};

export default getPositionReducers;
