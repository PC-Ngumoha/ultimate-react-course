/*
store.js: Redux store for global state mgt.
*/
import { createStore } from 'redux';

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'account/deposit':
      return { ...state, balance: state.balance + action.payload };

    case 'account/withdraw':
      return { ...state, balance: state.balance - action.payload };

    case 'account/requestLoan':
      if (state.loan > 0) return 0;
      // FIXME:
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };

    case 'account/payLoan':
      return {
        ...state,
        loan: 0,
        loanPurpose: '',
        balance: state.balance - state.loan,
      };

    default:
      // When working with Redux, don't throw an error.
      return state;
  }
}

const store = createStore(reducer);

store.dispatch({ type: 'account/deposit', payload: 2000 });

console.log(store.getState());

store.dispatch({ type: 'account/withdraw', payload: 200 });

console.log(store.getState());

store.dispatch({
  type: 'account/requestLoan',
  payload: { amount: 30000, purpose: 'Rent an apartment' },
});

console.log(store.getState());

store.dispatch({ type: 'account/payLoan' });

console.log(store.getState());
