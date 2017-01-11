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
