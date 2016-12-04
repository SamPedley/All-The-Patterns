import { pubSub } from './pubSub';


describe('Pub/Sub init', () => {
  let store = pubSub();

  it('should return a sub, unSub and pub methods', () => {
    expect(store.sub).toBeDefined();
    expect(store.unSub).toBeDefined();
    expect(store.pub).toBeDefined();
  })

});


describe('Pub/Sub methods', () => {
  let store = pubSub();

  it('adds events and callbacks', () => {
    let callback_a = jest.fn();
    let callback_b = jest.fn();

    store.sub('UPDATE_TEXT', callback_a);
    store.pub('UPDATE_TEXT', null);
    store.sub('UPDATE_TEXT', callback_b);
    store.pub('UPDATE_TEXT', null);
    expect(callback_a).toHaveBeenCalledTimes(2);
    expect(callback_b).toHaveBeenCalledTimes(1);
  });

  it('passes data to the callback', () => {
    let addStuff = (stay) => (by = 0) => stay += by;
    let incrementBy = addStuff(0);

    store.sub('INCREMENT', incrementBy);
    store.pub('INCREMENT', 5);
    expect(incrementBy()).toBe(5);

    store.pub('INCREMENT', 1);
    expect(incrementBy()).toBe(6);
  });

  it('removes listeners', () => {
    let callback_a = jest.fn();
    let callback_b = jest.fn();

    store.sub('UPDATE_TEXT', callback_a);
    store.sub('UPDATE_TEXT', callback_b);
    store.pub('UPDATE_TEXT', null);
    expect(callback_a).toHaveBeenCalledTimes(1);
    expect(callback_b).toHaveBeenCalledTimes(1);
    store.unSub('UPDATE_TEXT', callback_b);
    store.pub('UPDATE_TEXT', null);
    expect(callback_a).toHaveBeenCalledTimes(2);
    expect(callback_b).toHaveBeenCalledTimes(1);
  });

});
