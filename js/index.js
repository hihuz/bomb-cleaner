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


// /////////
// TODO  //
// /////////
// -> write tests for the the components
// -> take care of UI, design and any remaining
//    bugs / annoying stuff ( <<<< first click takes a lot of time :( )
// -> maybe reduce component knowledge of state to a minimum ?
// -> learn about and implement "selectors" w/ reselect

// question to ask :
// - in this particular mine sweeper example, where should most of the logic live ?
//      * Grid.js : the react component for the displayed grid ? I don't think so
//      * actionCreators.js : this could be done in 2 ways :
//        1) getState() from the store inside actionCreators
//           >> this is not encouraged I believe (see so post from dan),
//              but I may understand it wrong, getState is fine,
//              but passing state to the reducer from getstate is not fine
//         2) pass the grid as an action param from the Grid component
//            this could be the best practice but there is 0 async in this app,
//            and the data passed around in the actions are relatively huge soo...
//      * the reducers : I have read that reducers are best kept dumb simple :
//        take data from the action and Object.assign it
//        But I think in this  case it may make more sense to have the logic here ? not sure
//      * I have run into this situation where I realize my "grid" reducer
//        is gonna need to have access to the game status (worked around that)
//        but also the game "mode" to define the size of the grid
//        So.. is it best to have this big ass "grid" reducer, could also call it "game"
//        reducer at this point.. is there any prefered approach ?

// also ask about local state for the timer ? and how to implement it in redux

// also ask about how to properly handle different handlers
// on similar components based off index or whatever !!
