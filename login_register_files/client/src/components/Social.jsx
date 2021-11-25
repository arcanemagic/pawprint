import "../css/Social.css";
import Post from "./Post";
import ImgUpload from "./ImgUpload";
import logo from "../images/pawprint_logo.png";
import cat_img from "../images/social/powell_cat_image.jpeg";
import { NavLink } from "react-router-dom";

function Social() {
  return (
    <div className="App">
      <ul>
        <li>
          <Post
            username="adithi.ramesh02"
            caption="So Cute!!"
            image={cat_img}
            tag="cat"
          />
        </li>
        <li>
          <Post
            username="adithi.ramesh02"
            caption="So Cute!!"
            image={cat_img}
            tag="cat"
          />
        </li>
      </ul>
      <select name="pets" id="pet-select">
        <option value="">--Please choose an option--</option>
        <option value="dog">Dog</option>
        <option value="cat">Cat</option>
        <option value="squirrel">Squirrel</option>
        <option value="bird">Bird</option>
        <option value="bunny">Bunny</option>
        <option value="others">Others</option>
      </select>
      <NavLink class="nav-link" to="/create">
        <button>Post</button>
      </NavLink>
    </div>
  );
}

export default Social;
