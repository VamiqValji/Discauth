import loggedReducer from "./loggedReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  loggedInfo: loggedReducer,
});

export default allReducers;