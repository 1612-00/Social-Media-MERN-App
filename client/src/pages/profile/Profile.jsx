import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import ProfileRightbar from "../../components/profileRightbar/ProfileRightbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";

const Profile = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState([]);

  const username = useParams().username;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  return (
    <div>
      <Topbar />
      <div className="profileContainer">
        <div className="profileLeft">
          <Sidebar />
        </div>
        <div className="profileRight">
          <div className="profileTop">
            <img
              src={
                user.coverPicture
                  ? PF + user.coverPicture
                  : PF + `/person/noCover.png`
              }
              alt=""
              className="profilePictureCover"
            />
            <img
              src={
                user.profilePicture
                  ? PF + user.profilePicture
                  : PF + `/person/noAvatar.png`
              }
              alt=""
              className="profilePictureAvatar"
            />
            <div className="profileInfo">
              <div className="profileUsername">{user.username}</div>
              <span className="profileDesc">
                {user.desc || "Add desc now?"}
              </span>
            </div>
          </div>
          <div className="profileBottom">
            <div className="profileLeftBottom">
              <Feed username={username} />
            </div>
            <div className="profileRightBottom">
              <ProfileRightbar user={user} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
