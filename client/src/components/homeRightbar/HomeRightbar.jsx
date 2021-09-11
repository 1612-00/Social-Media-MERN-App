import "./homeRightbar.css";
import { Users } from "../../dummyData";
import PeopleOnline from "../peopleOnline/PeopleOnline";

const Rightbar = () => {
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        <div className="rightbarFriendBirthday">
          <img
            src="/assets/gift.png"
            alt=""
            className="rightbarFriendBirthdayIcon"
          />
          <span className="rightbarFriendBirthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birthday today.
          </span>
        </div>
        <img src="/assets/ad.png" alt="" className="rightbarImageAd" />
        <div className="rightbarOnlineFriend">
          <span className="rightbarOnlineFriendText">Online Friends</span>
          <ul className="rightbarOnlineList">
            {Users.map((u) => (
              <PeopleOnline key={u.id} user={u} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Rightbar;
