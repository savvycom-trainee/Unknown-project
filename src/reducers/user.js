const defaultState = {
  user: {},
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};
