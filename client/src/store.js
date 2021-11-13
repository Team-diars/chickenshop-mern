import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

// import { loadState, saveState } from "./localStorage";
// const persistedState = loadState();
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { cart } from "./../src/reducers/cart";

const initialState = {};

// const rootReducer = combineReducers({
//   cart,
// });

const middleware = [thunk];
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["cart"],
};
const PersistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  // rootReducer,
  // initialState,
  PersistedReducer,
  composeWithDevTools(applyMiddleware(...middleware))
  // composeEnhancers(applyMiddleware(...middleware))
  // persistedState
);
const persistedStore = persistStore(store);

// store.subscribe(() => {
//   saveState({
//     cart: store.getState().cart.cart,
//   });
// });

export { store, persistedStore };
