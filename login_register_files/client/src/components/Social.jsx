import "../css/Social.css";
import Post from "./Post";
import ImgUpload from "./ImgUpload";
import logo from "../images/pawprint_logo.png";
import cat_img from "../images/social/powell_cat_image.jpeg";
import { NavLink } from "react-router-dom";

function Social() {
  return (
    <div className="App">
      <Post
        username="adithi.ramesh02"
        caption="So Cute!!"
        image={cat_img}
        tag="cat"
      />
      <NavLink class="nav-link" to="/create">
        <button>Post</button>
      </NavLink>
    </div>
  );
}

export default Social;
