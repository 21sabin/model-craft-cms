import { LOGIN, LOGIN_ERROR, LOADING, LOGIN_SUCCESS } from "./auth.types";

const initialState = {
  currentUser: null,
  error: null,
  loading: false
};

export const authReducer = (state = initialState, action) => {
  console.log("*****auth reducer*****");
  switch (action.type) {
    case LOGIN:
      console.log("login success", action.payload);
      return { ...state, currentUser: action.user, loading: false };

    case LOGIN_ERROR:
      return { ...state, error: action.payload };

    case LOADING:
      return { ...state, loading: true };

    default:
      return state;
  }
};
