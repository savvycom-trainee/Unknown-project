import { combineReducers } from 'redux';
import { createNavigationReducer } from 'react-navigation-redux-helpers';
import RootNavigator from '../navigators/rootNavigator';

import getAddReducers from './getAddReducers';
import getNewFeedReducers from './getNewFeedReducers';
import postNewFeedReducers from './postNewFeedReducers';
import getHomeDetailReducers from './getHomeDetailReducers';
import getPositionReducers from './getPositionReducers';
import getAddSearchReducers from './getAddSearchReducers';
import getUserReducers from './getUserReducers';
import getUserSearchReducers from './getUserSearchReducers';
import getUserPinReducers from './getUserPinReducers';
import user from './user';

import getUserDetailReducers from './getUserDetailReducers';
import getPlaceDetailReducers from './getPlaceDetailReducers';
import getReviewReducers from './getReviewReducers';

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
  getUserReducers,
  getUserSearchReducers,
  getPlaceDetailReducers,
  getReviewReducers,
  getUserPinReducers,
});

export default rootRecuder;
