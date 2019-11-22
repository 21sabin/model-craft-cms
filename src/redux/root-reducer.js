import { combineReducers } from "redux";
import { authReducer } from "./auth/auth.reducer";
import { reducer as formReducer } from "redux-form";
import { eventReducer } from "./event/reducer";

export default combineReducers({
  form: formReducer,
  auth: authReducer,
  eventReducer: eventReducer
});
