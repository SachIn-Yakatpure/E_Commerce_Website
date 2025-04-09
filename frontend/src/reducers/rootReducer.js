import { combineReducers} from "@reduxjs/toolkit";
import cartReducer from "./cartReducer";
import currentProductReducer from "./currentProductReducer";
const rootReducer = combineReducers({

    cart:cartReducer,
    currentProduct : currentProductReducer
 
})

export default rootReducer;
