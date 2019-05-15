import { CREATE_ERROR, CLEAR_ERRORS } from "../actions/types";

const initialState = {
  error: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATE_ERROR:
      return { ...state, error: payload };

    case CLEAR_ERRORS:
      return initialState;

    default:
      return state;
  }
};
