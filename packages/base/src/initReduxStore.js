import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Bridge } from './Bridge';

const reducers = {
  // NOTE: redux must have at least 1 reducer
  root: () => ({}),
};

export default function initReduxStore() {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    getRootReducer(),
    composeEnhancers(applyMiddleware(ReduxThunk))
  );

  Bridge.Channel.subscribe('registerReducer', reducerMap => {
    mergingReducer(reducers, reducerMap);

    store.replaceReducer(getRootReducer());
  });

  return store;
}

function getRootReducer() {
  return combineReducers(reducers);
}

function mergingReducer(currentReducerMap, newReducerMap) {
  for (const newKey in newReducerMap) {
    if (newKey in currentReducerMap) {
      const currentReducer = currentReducerMap[newKey];
      const newReducer = newReducerMap[newKey];
      currentReducerMap[newKey] = (state, action) =>
        newReducer(currentReducer(state, action), action);
    } else {
      currentReducerMap[newKey] = newReducerMap[newKey];
    }
  }
}
