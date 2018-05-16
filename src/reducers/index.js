import { combineReducers } from 'redux';
import { createNavigationReducer } from 'react-navigation-redux-helpers';
import RootNavigator from '../navigators/rootNavigator';

const navReducer = createNavigationReducer(RootNavigator);

const rootRecuder = combineReducers({
  navigation: navReducer,
});

export default rootRecuder;
