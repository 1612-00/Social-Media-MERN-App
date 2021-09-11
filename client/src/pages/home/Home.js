import Topbar from "../../components/topbar/Topbar";
import Sidebar from "./../../components/sidebar/Sidebar";
import Feed from "./../../components/feed/Feed";
import HomeRightbar from "../../components/homeRightbar/HomeRightbar";
import "./home.css";

const Home = () => {
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <Feed />
        <HomeRightbar />
      </div>
    </>
  );
};

export default Home;
