import "../css/Social.css";
import Post from "./Post";
import ImgUpload from "./ImgUpload";
import logo from "../images/pawprint_logo.png";
import cat_img from "../images/social/powell_cat_image.jpeg";
import { NavLink } from "react-router-dom";
import Profile from './profile.jsx'

function Social() {
  return (
    <div className="App">
      <div className="postbutton">
        <NavLink class="nav-link" to="/create">
          <button>Post</button>
        </NavLink>
      </div>
      <ul>
        <li>
          <Post
          />
        </li>
      </ul>
    </div>
  );
}

export default Social;
