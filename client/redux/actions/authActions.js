import {
  LOGIN_SUCCESS,
  LOGIN_DENIED,
  REGISTER_SUCCESS,
  REGISTER_DENIED,
  AUTH_ERROR,
  USER_LOADING,
  LOGOUT_USER,
  USER_LOADED
} from "../actions/types";

import { createError } from "./errorActions";

import axios from "axios";

export const loadUser = () => (dispatch, getState) => {
  console.log("RUNNING");
  dispatch({
    type: USER_LOADING
  });
  axios
    .get("http://localhost:8082/api/auth", createConfig(getState))
    .then(res =>
      dispatch({
        type: USER_LOADED,
        payload: {
          user: res.data
        }
      })
    )
    .catch(err => {
      dispatch({
        type: AUTH_ERROR
      });
    });
};

export const loginUser = ({ email, password }) => (dispatch, getState) => {
  dispatch({
    type: USER_LOADING
  });
  axios
    .post(
      "http://localhost:8082/api/auth/login",
      { email, pw: password },
      createConfig(getState)
    )
    .then(res =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          token: res.data.token,
          user: res.data.user
        }
      })
    )
    .catch(err => {
      dispatch(createError(err.response.data.message, err.response.status));
      dispatch({
        type: LOGIN_DENIED
      });
    });
};

export const registerUser = ({ name, email, password }) => (
  dispatch,
  getState
) => {
  dispatch({
    type: USER_LOADING
  });
  axios
    .post(
      "http://localhost:8082/api/auth/register",
      { name, email, pw: password },
      createConfig(getState)
    )
    .then(res =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: {
          token: res.data.token,
          user: res.data.user
        }
      })
    )
    .catch(err => {
      dispatch(createError(err.response.data, err.response.status));
      dispatch({
        type: REGISTER_DENIED
      });
    });
};

export const logoutUser = () => {
  return {
    type: LOGOUT_USER
  };
};

const createConfig = getState => {
  const token = getState().auth.token;
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return config;
};
