/*
store.js: Redux store for global state mgt.
*/
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import accountReducer from './features/accounts/accountSlice';
import customerReducer from './features/customers/customerSlice';

// Combine reducers into a single root reducer
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(
  rootReducer,
  // Enables Redux devtools.
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
