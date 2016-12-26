import CreateGrid from '../app-logic/GridFactory';

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    const parsedState = JSON.parse(serializedState);
    parsedState.grid = CreateGrid(
      parsedState.grid.width,
      parsedState.grid.height,
      parsedState.grid.bombs
    );
    return parsedState;
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    // add later
  }
};
