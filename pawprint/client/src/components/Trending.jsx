import React, {useEffect, useState } from "react";
import "../css/Post.css";
import username_logo from "../images/social/profile_img.jpg";
import nolikes from "../images/social/powell_cat_nolikes.png";
import likes from "../images/social/powell_cat_likes.png";
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
  
  
    useEffect(() => {
      Axios.get("https://bruin-pawprint.herokuapp.com/byTrending").then((response) => {
          setTrends(response.data);
      });
    }, []);
  
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
              {val.num_like === 0? <Icon symbol={nolikes} altName="nolikes icon" />:
                <Icon symbol={likes} altName="likes icon" />}
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
  