import { combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./cartReducer";
import currentProductReducer from "./currentProductReducer";
import userLoginReducer from "./userReducer";

const appReducer = combineReducers({
  userLogin: userLoginReducer,
  cart: cartReducer,
  currentProduct: currentProductReducer,
});

// Wrap rootReducer to reset state on logout
const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined; //  Clears all Redux state
  }
  return appReducer(state, action);
};

export default rootReducer;
