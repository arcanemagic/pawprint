import React, {useEffect, useState } from "react";
import "../css/Post.css";
import username_logo from "../images/social/username_logo.png";
import comment_symbol from "../images/social/comment_symbol.png";
import nolikes from "../images/social/powell_cat_nolikes.png";
import like from "../images/social/powell_cat_likes.png";
import Axios from 'axios';
import { Image } from "cloudinary-react";

function Icon(props) {
  return <img className="icon" src={props.symbol} alt={props.altName} />;
}

function Post() {
  const [uploads, setUploads] = useState([]);
  const [likes, setLikes] = useState([]);
  const user = localStorage.getItem("username");

  useEffect(() => {
    if (!localStorage.getItem("loggedIn")) {
      localStorage.setItem("loggedIn", false);
    }
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:8000/social").then((response) => {
      setUploads(response.data);
    });
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:8000/liked", {
      params: {
        user : user,
      }
    }).then((response) => {
        setLikes(response.data);
    });
  }, [user]);

  const likePost = (id, key) => {
    if (localStorage.getItem("loggedIn") === "false"){
      alert("please log in to like!")
    }
    else if (likes.includes(id)){
      Axios.post("http://localhost:8000/unlike", {
        user_id: user,
        post_id: id,
      }).then((response) => {
        alert("you have unliked this post")
      });
    }
    else{
      var tempLikes = uploads;
      tempLikes[key].likes = tempLikes[key].likes + 1;
      Axios.post("http://localhost:8000/like", {
        user_id: localStorage.getItem("username"),
        post_id: id,
      }).then((response) => {
        setUploads(tempLikes);
        alert("you have liked this post")
      });
    }
    
  };

  return (
    <div>
      {uploads.map((val, key) => {
        return (
          <div className="user_post">
            <div className="username_header">
              <strong>{val.user_id}</strong>
            </div>
            <div className="post_image">
              <Image cloudName="bruin-pawprint" publicId={val.image} />
            </div>
            <div className="icons"
                onClick={() => {
                  likePost(val.id, key);
                }}>
                <div className="user_caption">
                {" "}
                {"Description:     "}{val.title}
              </div>
              <div className="likes"> 
              { !likes.includes(val.id) ? (
                <Icon symbol={nolikes} altName="nolikes icon" />
              ) : (
                <Icon symbol = {like} altName = "likes icon"/>
              )}
              {val.num_like} likes </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default Post;
