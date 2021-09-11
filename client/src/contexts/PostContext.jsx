import axios from "axios";
import { createContext } from "react";

const INITIAL_STATE = {};

export const PostContext = createContext(INITIAL_STATE);

const PostContextProvider = ({ children }) => {
  const likePost = async (postId, userId) => {
    try {
      await axios.put(`posts/${postId}/like`, { userId });
    } catch (error) {
      console.log(error);
    }
  };

  const uploadImage = async (data) => {
    try {
      await axios.post("/upload", data);
    } catch (error) {
      console.log(error);
    }
  }

  const uploadPost = async (newPost) => {
    try {
      await axios.post("/posts", newPost);
    } catch (error) {
      console.log(error);
    }
  };

  const PostContextData = { likePost, uploadPost, uploadImage };

  return (
    <PostContext.Provider value={PostContextData}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
