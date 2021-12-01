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
  
  function Trending() {
    const [trends, setTrends] = useState([]);
  
  
    useEffect(() => {
      Axios.get("http://localhost:8000/byTrending").then((response) => {
          setTrends(response.data);
      });
    }, []);
  
    return (
      <div>
         <div>
         <h2 className="pp">Trending posts: </h2>
        {trends.map((val, key) => {
          return (
            <div className="user_post">
            <div className="username_header">
              <strong>{val.user_id}</strong>
            </div>
              <div className="post_image">
                <Image cloudName="bruin-pawprint" publicId={val.image} />
              </div>
              <div>
                <div className="user_caption">
                  {" "}
                  {"Description:     "}{val.title}
                </div>
              </div>
              <div className="likes"> 
              {val.num_like === 0? <Icon symbol={nolikes} altName="nolikes icon" />:
                <Icon symbol={likes} altName="likes icon" />}
                {val.num_like} likes </div>
            </div>
          );
        })}
      </div>
      </div>
    );
  }
  export default Trending;
  