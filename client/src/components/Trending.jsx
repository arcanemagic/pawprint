import React, {useEffect, useState } from "react";
import "../css/Post.css";
import username_logo from "../images/social/profile_img.jpg";
import nolikes from "../images/social/powell_cat_nolikes.png";
import like from "../images/social/powell_cat_likes.png";
import Axios from 'axios';
import styled from "styled-components";
import { Image } from "cloudinary-react";
import { Button } from "./Button";
import { IoIosAdd } from "react-icons/io"

const PlusIcon = styled(IoIosAdd)``;

function Icon(props) {
    return <img className="icon" src={props.symbol} alt={props.altName} />;
  }
  
  function Trending() {
    const [trends, setTrends] = useState([]);
    const [likes, setLikes] = useState([]);
    const user = localStorage.getItem("username");
  
    useEffect(() => {
      Axios.get("https://bruin-pawprint.herokuapp.com/byTrending").then((response) => {
          setTrends(response.data);
      });
    }, []);

    useEffect(() => {
      Axios.get("https://bruin-pawprint.herokuapp.com/liked", {
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
      } else if (likes.includes(id)){
        var dislikes = trends;
        dislikes[key].num_like = dislikes[key].num_like - 1;
        Axios.post("https://bruin-pawprint.herokuapp.com/unlike", {
          user_id: user,
          post_id: id,
        }).then((response) => {
          setTrends(dislikes);
          setLikes(response.data);
          console.log(response.data);
          console.log("you have unliked this post");
        });
      }
      else{
        var tempLikes = trends;
        tempLikes[key].num_like = tempLikes[key].num_like + 1;
        Axios.post("https://bruin-pawprint.herokuapp.com/like", {
          user_id: localStorage.getItem("username"),
          post_id: id,
        }).then((response) => {
          setTrends(tempLikes);
          setLikes(response.data)
          console.log("you have liked this post")
        });
      }
      
    };
  
  
    return (
      <div className="postContainer">
        <div class="postButtons">
          <Button primary="true" href="/create">
            New Post
            <PlusIcon />
          </Button>
          <Button primary="true" href="/post">
            Sort Chronologically
          </Button>
          <Button primary="true" href="/search">
            Search by User
          </Button>
        </div>
        {trends.map((val, key) => {
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
              <div>
              </div>
              <div className="likes"> 
              { likes.includes(val.id) ? (
                  <img className="icon" src={like} alt={"likes icon"} onClick={() => {
                    likePost(val.id, key);
                  }}/>
                ): (
                  <img className="icon" src={nolikes} alt={"nolikes icon"} onClick={() => {
                    likePost(val.id, key);
                  }}/>
                  )}
                {val.num_like} likes </div>
                <div className="user_caption">
                {" "}
                <strong>{val.user_id}</strong> {" "} {val.title}
              </div>
            </div>
          );
        })}
      </div>
    );
}

  export default Trending;
  