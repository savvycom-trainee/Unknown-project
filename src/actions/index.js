export * from './getAddAction';
export * from './getNewFeedAction';
export * from './postNewFeedAction';
export * from './getHomeDetailAction';

export const setUser = user => ({
  type: 'SET_USER',
  user,
});
