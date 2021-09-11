import "./profileRightbar.css";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./../../contexts/AuthContext";
import { Add, Remove } from "@material-ui/icons";

const ProfileRightbar = ({ user }) => {
  // State
  const [followed, setFollowed] = useState(false);

  // Context
  const {
    state: { user: currentUser, friendList },
    getAllFriends,
    follow,
    unfollow,
  } = useContext(AuthContext);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    setFollowed(currentUser.followings.includes(user?._id));
  }, [user._id]);

  useEffect(() => {
    getAllFriends(user._id);
  }, [user._id]);

  const handleFolowing = () => {
    if (followed) unfollow(user._id, currentUser._id);
    else follow(user._id, currentUser._id);
  };

  return (
    <div className="profileRightbar">
      <div className="profileRightbarWrapper">
        {user.username !== currentUser.username && (
          <button className="rightbarFollowBtn" onClick={handleFolowing}>
            {followed ? "Un Follow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="profileRightbarTitle">User information</h4>
        <div className="profileRightbarInfo">
          <div className="profileRightbarInfoItem">
            <span className="profileRightbarInfoKey">City:</span>
            <span className="profileRightbarInfoValue">{user.city}</span>
          </div>
          <div className="profileRightbarInfoItem">
            <span className="profileRightbarInfoKey">From:</span>
            <span className="profileRightbarInfoValue">{user.from}</span>
          </div>
          <div className="profileRightbarInfoItem">
            <span className="profileRightbarInfoKey">Relationship:</span>
            <span className="profileRightbarInfoValue">
              {user.relationship}
            </span>
          </div>
        </div>
        <h4 className="profileRightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friendList.map((friend) => (
            <Link
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none", color: "black" }}
            >
              <div key={friend._id} className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + `/person/noCover.png`
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileRightbar;
