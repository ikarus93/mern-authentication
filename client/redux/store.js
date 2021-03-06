import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index.js";

const middleware = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//Create store with rootReducer, initialState(empty as its put into each reducer file ), and composeEnhancers to include redux devtools as well as middleware
const store = createStore(
  rootReducer,
  {},
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;
