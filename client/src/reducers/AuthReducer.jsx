import {
  GET_ALL_FRIENDS,
  LOGIN_FAILURE,
  LOGIN_START,
  LOGIN_SUCCESS,
} from "./type";

const AuthReducer = (state, action) => {
  switch (action.type) {
    case LOGIN_START:
      return {
        user: null,
        isFetching: true,
        error: false,
        friendList: [],
      };

    case LOGIN_SUCCESS:
      return {
        user: action.payload,
        isFetching: false,
        error: false,
        friendList: [],
      };

    case LOGIN_FAILURE:
      return {
        user: null,
        isFetching: false,
        error: action.payload,
        friendList: [],
      };

    case GET_ALL_FRIENDS:
      return {
        ...state,
        friendList: action.payload,
      };

    default:
      return state;
  }
};

export default AuthReducer;
