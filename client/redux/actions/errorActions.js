import { CREATE_ERROR, CLEAR_ERRORS } from "./types";

export const createError = (msg, status) => {
  return {
    type: CREATE_ERROR,
    payload: {
      message: msg,
      status: status
    }
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
