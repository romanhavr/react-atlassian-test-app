import { USER_FETCH_REQUESTED, USER_FETCH_SUCCEEDED, USER_FETCH_FAILED, ASYNC_TYPE } from "../actionTypes";

const initialState = {
  sagaData: null,
  sagaSucceeded: null,
  sagaFailed: null,
  someUser: null
};

export default (state = initialState, action) => {
  switch (action.type) {

    case USER_FETCH_REQUESTED: {
      return {
        ...state,
        sagaData: action.payload.data
      };
    }

    case USER_FETCH_SUCCEEDED: {
        return {
          ...state,
          sagaSucceeded: action.payload
        };
    }

    case USER_FETCH_FAILED: {
        return {
          ...state,
          sagaFailed: action.message
        };
    }

    case ASYNC_TYPE: {
        return {
          ...state,
          someUser: action.user
        };
    }

    default:
      return state;
  }
}