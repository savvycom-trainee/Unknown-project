export * from './getAddAction';
export * from './getNewFeedAction';
export * from './postNewFeedAction';
export * from './getHomeDetailAction';
export * from './getPositionAction';
export * from './getAddbySearchAction';

export const setUser = user => ({
  type: 'SET_USER',
  user,
});
