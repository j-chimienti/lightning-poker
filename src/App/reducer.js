const handlers = [];

export function addHandler(type, fn) {
  handlers.push([type, fn]);
}

function reducer(state, action) {
  let changes = {};
  for (const [type, fn] of handlers) {
    if (type === action.type) {
      Object.assign(changes, fn(action, state, changes));
    }
  }
  return Object.assign({}, state, changes);
}

export default reducer;
