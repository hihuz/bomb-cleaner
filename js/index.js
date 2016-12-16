import React from 'react';
import { render } from 'react-dom';
import { createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers/root';
import App from './components/App';

const store = createStore(rootReducer, compose(
  typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);


///////////
// TODO  //
///////////

// -> change the cell type to have index and not positions, this would simplify a lot of shit, but this needs to be updated everywhere:-(
// -> implement the recursion to find all cells to open for a click on an empty cell
// -> learn about and implement "selectors" w/ reselect
