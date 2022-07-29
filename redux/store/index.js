import Reducer from '../reducers';
import { createStore, applyMiddleware,compose } from 'redux';
import thunk from 'redux-thunk';

const componseEnhancer = typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(Reducer, {}, componseEnhancer(
    applyMiddleware(thunk)
  ));



