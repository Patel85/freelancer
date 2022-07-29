import { combineReducers } from "redux";

import Auth from "./AuthReducer";
import Global from "./globalReducer";
import UI from "./UiReducer";

const state = combineReducers({
  Auth,
  Global,
  UI,
});

export default state;
