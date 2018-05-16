import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import AppReducer from './reducers';
import Navigator from './navigators';
import { middleware } from './utilities/redux';

const store = createStore(AppReducer, applyMiddleware(...middleware));

class App extends PureComponent {
  state = {
    isLoading: true,
  };
  render() {
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }
}

export default App;
