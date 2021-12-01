import React, {useEffect, useState } from "react";
import "../css/Post.css";
import username_logo from "../images/social/profile_img.jpg";
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
      var dislikes = uploads;
      dislikes[key].num_like = dislikes[key].num_like - 1;
      Axios.post("http://localhost:8000/unlike", {
        user_id: user,
        post_id: id,
      }).then((response) => {
        setUploads(dislikes);
        setLikes(response.data)
        console.log("you have unliked this post")
      });
    }
    else{
      var tempLikes = uploads;
      tempLikes[key].num_like = tempLikes[key].num_like + 1;
      Axios.post("http://localhost:8000/like", {
        user_id: localStorage.getItem("username"),
        post_id: id,
      }).then((response) => {
        setUploads(tempLikes);
        setLikes(response.data)
        console.log("you have liked this post")
      });
    }
    
  };

  return (
    <div>
      {uploads.map((val, key) => {
        return (
          <div className="user_post">
            <div className="username_header">
             <img
                className="username_logo"
                src={username_logo}
                alt="logo"/>
              <strong>{val.user_id}</strong>
            </div>
            <div className="post_image">
              <Image cloudName="bruin-pawprint" publicId={val.image} />
            </div>
            <div className="icons"
                onClick={() => {
                  likePost(val.id, key);
                }}>
              <div className="likes"> 
              { !likes.includes(val.id) ? (
                <Icon symbol={nolikes} altName="nolikes icon" />
              ) : (
                <Icon symbol = {like} altName = "likes icon"/>
              )}
              {val.num_like} likes </div>
              <div className="user_caption">
                {" "}
                <strong>{val.user_id}</strong> {" "} {val.title}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
  
}

export default Post;
