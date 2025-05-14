import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/rootReducer";

// ✅ Load userInfo from localStorage (if present)
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// ✅ Provide it as initial state to the store
const preloadedState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const store = configureStore({
  reducer: rootReducer,
  preloadedState,  
});

export default store;
