import "./feed.css";
import Share from "./../share/Share";
import Post from "./../post/Post";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "./../../contexts/AuthContext";

const Feed = ({ username }) => {
  const [posts, setPosts] = useState([]);

  // Context
  const {
    state: { user },
  } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get(`/posts/profile/${username}`)
        : await axios.get(`/posts/timeline/${user._id}`);
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [username]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
