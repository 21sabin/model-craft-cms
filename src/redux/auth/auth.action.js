import { LOGIN, LOGIN_ERROR, LOADING, LOGIN_SUCCESS } from "./auth.types";
import axios from "axios";
import apiUri from "../../environment/environment";

const API_URI = apiUri.development;

export const loading = () => ({
  type: LOADING
});

export const loginFailed = error => ({
  type: LOGIN_ERROR,
  payload: 'Authentication Failed!'
});

export const signIn = (email, password, history) => {
  console.log("api uri", API_URI);
  return async dispatch => {
    dispatch(loading());
    try {
      const auth_result = await axios.post(`${API_URI}` + "auth/login", {
        email,
        password
      });
      localStorage.setItem("loggedInUser", JSON.stringify(auth_result.data));
      history.push("/dashboard");
      dispatch({
        type: LOGIN,
        payload: auth_result.data
      });
    } catch (error) {
      console.log("auth failed", error);
      dispatch(loginFailed(error));
    }
  };
};
