import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import genres from './genres'
import instruments from './instruments'
import users from './users';
import songs from './songs';
import search from './search';
import conversations from './conversations';
import messages from './messages';

const rootReducer = combineReducers({
  session,
  genres,
  instruments,
  users,
  songs,
  search,
  conversations,
  messages
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
