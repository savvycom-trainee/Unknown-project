import { ADD_NEW_NOTIFICATION, SEEN_NOTIFICATION } from '../constants/actionTypes';

export default (state = false, action) => {
  switch (action.type) {
    case ADD_NEW_NOTIFICATION: {
      console.log(action);
      return true;
    }
    case SEEN_NOTIFICATION:
      return false;
    default:
      return state;
  }
};
