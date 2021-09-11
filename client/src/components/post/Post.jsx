import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { PostContext } from "./../../contexts/PostContext";
import { AuthContext } from "./../../contexts/AuthContext";

const Post = ({ post }) => {
  const [like, setLike] = useState(post.like.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState([]);

  // Context
  const {
    state: { user: currentUser },
  } = useContext(AuthContext);
  const { likePost } = useContext(PostContext);

  useEffect(() => {
    setIsLiked(post.like.includes(currentUser._id));
  }, [currentUser._id, post.like]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const handleLikePost = () => {
    likePost(post._id, currentUser._id);
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : `${PF}/person/noAvatar.png`
                }
                alt=""
                className="postAvatar"
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postRight">
            <MoreVert className="MoreVert" />
          </div>
        </div>
        <div className="postCenter">
          <span className="postContent">{post?.desc}</span>
          <img src={PF + `${post.img}`} alt="" className="postImage" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              src={`${PF}like.png`}
              alt=""
              className="postIcon"
              onClick={handleLikePost}
            />
            <img
              src={`${PF}heart.png`}
              alt=""
              className="postIcon"
              onClick={handleLikePost}
            />
            <span className="totalLiked">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postComment">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
