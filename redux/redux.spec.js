import { createStore } from './redux';

const names = (state = [], action) => {
  switch (action.type) {
    case 'ADD_NAME':
      return [...state, action.name];
    default:
    return state;
  }
}

describe('Redux CreateStore', () => {
  let store = createStore(names);

  it('should return a getState, dispatch and subscribe methods', () => {
    expect(store.getState).toBeDefined();
    expect(store.dispatch).toBeDefined();
    expect(store.subscribe).toBeDefined();
  });

});

describe('Redux store.getState method', () => {
  let store = createStore(names);

  it('returns the state', () => {
    expect(store.getState()).toBeInstanceOf(Array);
    expect(store.getState().length).toBe(0);
  });

});

describe('Redux store.dispatch method', () => {
  let store = createStore(names);

  it('updates the state', () => {
    store.dispatch({ type: 'ADD_NAME', name: 'Billy' });
    store.dispatch({ type: 'ADD_NAME', name: 'Bob' });
    expect(store.getState()).toEqual(['Billy','Bob']);
  });

});

describe('Redux store.subscribe method', () => {
  let store = createStore(names);

  it('watches state', () => {
      let callback_a = jest.fn();
      let callback_b = jest.fn();
      store.subscribe(callback_a);
      store.dispatch({});
      store.subscribe(callback_b);
      store.dispatch({});
    expect(callback_a).toHaveBeenCalledTimes(2);
    expect(callback_b).toHaveBeenCalledTimes(1);
  });

});
