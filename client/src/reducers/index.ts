import loggedReducer from "./loggedReducer";
import loginModalReducer from "./loginModalReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  loggedInfo: loggedReducer,
  loginModalState: loginModalReducer,
});

export default allReducers;