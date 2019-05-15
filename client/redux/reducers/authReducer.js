import {
  LOGIN_SUCCESS,
  LOGIN_DENIED,
  REGISTER_SUCCESS,
  REGISTER_DENIED,
  AUTH_ERROR,
  USER_LOADING,
  USER_LOADED,
  LOGOUT_USER
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token") || null,
  userAuthenticated: false,
  userLoading: false,
  user: {}
};
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
    case USER_LOADED:
      if (payload.token) localStorage.setItem("token", payload.token);
      return {
        ...state,
        userAuthenticated: true,
        userLoading: false,
        user: payload.user
      };

    case LOGIN_DENIED:
    case REGISTER_DENIED:
    case AUTH_ERROR:
    case LOGOUT_USER:
      console.log("Itsrunning");
      localStorage.removeItem("token");
      return {
        ...initialState
      };

    case USER_LOADING:
      return { ...state, userLoading: true };

    default:
      return state;
  }
};
