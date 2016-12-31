import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import throttle from 'lodash/throttle';
import { loadState, saveState } from './app-logic/localStorage';
import rootReducer from './reducers/root';
import App from './components/App';

const store = createStore(
  rootReducer,
  loadState(),
  typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
);

store.subscribe(throttle(() => {
  const state = store.getState();
  saveState({
    mode: state.mode,
    highScores: state.highScores,
    grid: {
      width: state.grid.width,
      height: state.grid.height,
      bombs: state.grid.bombs
    }
  });
}), 1000);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);


/* ///////////
   // TODO  //
   /////////// */
// -> write tests for the the components
// -> try to fix performance for first click on huge boards / long frames on chrome timeline
// -> try to figure out if my functionnal components that declare functions should be converted
