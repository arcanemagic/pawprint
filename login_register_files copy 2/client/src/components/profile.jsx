import React, {useEffect, useState } from "react";
import "../css/Post.css";
import username_logo from "../images/social/username_logo.png";
import comment_symbol from "../images/social/comment_symbol.png";
import nolikes from "../images/social/powell_cat_nolikes.png";
import likes from "../images/social/powell_cat_likes.png";
import Axios from 'axios';
import { Image } from "cloudinary-react";

function Icon(props) {
  return <img className="icon" src={props.symbol} alt={props.altName} />;
}

function Profile() {
  const [yourUploads, setYouruploads] = useState([]);


  useEffect(() => {
    Axios.get(`http://localhost:8000/byUser/${localStorage.getItem("username")}`).then((response) => {
        setYouruploads(response.data);
    });
  }, []);

  return (
    <div>
       <div>
      <h1>{localStorage.getItem("username")}</h1>
      {yourUploads.map((val, key) => {
        return (
          <div className="user_post">
            <div className="post_image">
              <Image cloudName="bruin-pawprint" publicId={val.image} />
            </div>
            <div>
              <div className="user_caption">
                {" "}
                {val.title}
              </div>
            </div>
          </div>
        );
      })}
    </div>
    </div>
  );
}
export default Profile;
