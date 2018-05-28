export * from './getAddAction';
export * from './getNewFeedAction';

export const setUser = user => ({
  type: 'SET_USER',
  user,
});
