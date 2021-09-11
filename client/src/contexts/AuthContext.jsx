import axios from "axios";
import { createContext, useReducer } from "react";
import AuthReducer from "../reducers/AuthReducer";
import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GET_ALL_FRIENDS,
} from "./../reducers/type";

const INITIAL_STATE = {
  user: null,
  isFetching: false,
  error: false,
  friendList: [],
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  const login = async (userForm) => {
    dispatch({ type: LOGIN_START });
    try {
      const res = await axios.post("auth/login", userForm);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({ type: LOGIN_FAILURE, payload: error });
    }
  };

  const register = async (user) => {
    try {
      await axios.post("auth/register", user);
      return true;
    } catch (error) {
      console.log(error);
    }
  };

  const getAllFriends = async (userId) => {
    try {
      const res = await axios.get("/users/friends/" + userId);
      dispatch({ type: GET_ALL_FRIENDS, payload: res.data });
    } catch (error) {
      console.log(error);
    }
  };

  const follow = async (userId, currentUserId) => {
    try {
      await axios.put(`/users/${userId}/follow`, { userId: currentUserId });
    } catch (error) {
      console.log(error);
    }
  };

  const unfollow = async (userId, currentUserId) => {
    try {
      await axios.put(`/users/${userId}/unfollow`, { userId: currentUserId });
    } catch (error) {
      console.log(error);
    }
  };

  const AuthContextData = {
    state,
    login,
    register,
    getAllFriends,
    follow,
    unfollow,
  };

  return (
    <AuthContext.Provider value={AuthContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
