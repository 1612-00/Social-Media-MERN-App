import "./peopleOnline.css";

const PeopleOnline = ({ user }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <li className="rightbarOnlineItem">
      <div className="rightbarOnlineItemContainer">
        <img
          src={PF + user.profilePicture}
          alt=""
          className="rightbarOnlineItemImg"
        />
        <span className="rightbarOnline"></span>
      </div>
      <span className="rightbarOnlineItemUsername">{user.username}</span>
    </li>
  );
};

export default PeopleOnline;
