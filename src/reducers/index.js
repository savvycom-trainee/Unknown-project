import { combineReducers } from 'redux';
import { createNavigationReducer } from 'react-navigation-redux-helpers';
import RootNavigator from '../navigators/rootNavigator';

import getAddReducers from './getAddReducers';
import getNewFeedReducers from './getNewFeedReducers';
import postNewFeedReducers from './postNewFeedReducers';
import getHomeDetailReducers from './getHomeDetailReducers';
import getPositionReducers from './getPositionReducers';
import getAddSearchReducers from './getAddSearchReducers';
import getUserDetailReducers from './getUserDetailReducers';
import user from './user';

const navReducer = createNavigationReducer(RootNavigator);

const rootRecuder = combineReducers({
  navigation: navReducer,
  getAddReducers,
  getNewFeedReducers,
  postNewFeedReducers,
  getHomeDetailReducers,
  getPositionReducers,
  user,
  getAddSearchReducers,
  getUserDetailReducers,
});

export default rootRecuder;
