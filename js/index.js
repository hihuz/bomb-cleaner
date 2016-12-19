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
// -> implement the recursion to find all cells to open for a click on an empty cell
// -> remove the need for empty cell vs number cell, should be the same logic
// -> check if the logic needs to go in the action creators instead of the reducers (for devtools compatibility!)
// -> if so, reduce component knowledge of state to a minimum ?
// -> learn about and implement "selectors" w/ reselect


//question to ask :
// - in this particular mine sweeper example, where should most of the logic live ?
//      * Grid.js : the react component for the displayed grid ? I don't think so
//      * actionCreators.js : this could be done in 2 ways : 1) getState() from the store inside actionCreators
//                                                                >> this is not encouraged I believe (see so post from dan), but I may understand it wrong, getState is fine, but passing state to the reducer from getstate is not fine
//                                                           2) pass the grid as an action param from the Grid component
//                            this could be the best practice but there is 0 async in this app soo...
//      * the reducers : I have read that reducers are best kept dumb simple : take data from the action and Object.assign
//                       But I think in this  case it may make more sense to have the logic here ? not sure
