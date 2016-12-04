export const pubSub = () => {
  let events = {};

  const pub = (eventName, data) => {
    if(events[eventName])
      events[eventName].forEach( (callback) => callback(data) );
  }

  const sub = (eventName, callback) => {
    events[eventName] = events[eventName] || [];
    events[eventName].push(callback);
  }

  const unSub = (eventName, callback) => {
    if(events[eventName]){
      let index = events[eventName].indexOf(callback);
      events[eventName].splice(index, 1);
    }
  }

  return { sub, unSub, pub }
}
