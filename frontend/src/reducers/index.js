import { combineReducers } from "redux";
import userReducer from "./user";
import friendReducer from "./friends";

const rootReducer = combineReducers({
    userState:userReducer,
    friendState:friendReducer
});

export default rootReducer;