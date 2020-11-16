import './App.css';

import { createStore, combineReducers } from "redux";
import { Provider, connect } from "react-redux";

// Actions Type
// ============
const ADD_NUMBER = "add_number";
const SUB_NUMBER = "sub_number";

// Action (Real Ones)
// ==================
const addAction = () => ({
  type: ADD_NUMBER,
  payload: 1
}); // returns an object

const subAction = () => ({
  type: SUB_NUMBER,
  payload: 1
}); // returns an object

// Reducer - passes two parameters state and action with initial value for state
// =============================================================================
const mathReducer = (state = { number: 0 }, action) => {
  if (action.type === ADD_NUMBER) {
    return {
      ...state,
      number: state.number + action.payload
    }; // returns a new state (updates the state)
  } else if (action.type === SUB_NUMBER && state.number > 0) {
    return {
      ...state,
      number: state.number - action.payload
    };
  }

  return state;
}

// Root Reducer - if we create multiple reducers, then we combine all rducers here
// ===============================================================================
const rootReducer = combineReducers({
  math: mathReducer
  // add more reducers here in case there is any
});

// Store - in this app, there is only one store (Global State)
// ===========================================================
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // for simple applications
); // the copmbined reducers (rootReducer) should be passed here to the store

// mapStateToProps - maps the state from Store to the Props we want to pass into our App
// =====================================================================================
// "state" comes from Store
const mapStateToProps = state => {
  return {
    number: state.math.number,
  };
}

// MapDispatchToProp - for "modifying a state" using a previously defined action functions in the store we use "dispatch"
// ============================================================================================================
const mapDispatchToProps = dispatch => ({
  add: () => dispatch(addAction()),
  sub: () => dispatch(subAction())
});

const Counter = (props) => (
  <div>
    <h2>Counter: {props.number}</h2>
    <input type="button" value="add" onClick={props.add} />
    <input type="button" value="sub" onClick={props.sub} />
  </div>
);

// connecting (mapping) state to props
// ===================================
const ConnectedCounter = connect(mapStateToProps, mapDispatchToProps)(Counter); // check the next two lines if you are confused
// const ConnectedCounter = connect(mapStateToProps, mapDispatchToProps); // this returns another function, so we can write it as the previous line
// const ABC = ConnectedCounter(Counter);

const App = () => (
  <Provider store={store}>
    <ConnectedCounter /> {/* instead of <Counter /> we use the new connected counter named "ConnectedCounter" */}
  </Provider>
);

export default App;
