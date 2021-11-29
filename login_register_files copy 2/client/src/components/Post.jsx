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

// function Comment(props) {
//   return (
//     <div>
//       <strong>{props.userName}</strong> {props.text}
//     </div>
//   );
// }

function Post() {
  const [uploads, setUploads] = useState([]);

  // const [inputText, setInputText] = useState("");

  // const updateInputBox = (event) => {
  //   setInputText(event.target.value);
  // };

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

  // const addComment = () => {
  //   setComments([
  //     comments,
  //     <Comment key={inputText} userName={props.accountName} text={inputText} />,
  //   ]);
  //   setInputText("");
  // };

  const likePost = (id, key) => {
    var tempLikes = uploads;
    tempLikes[key].likes = tempLikes[key].likes + 1;

    Axios.post("http://localhost:8000/like", {
      user_id: localStorage.getItem("username"),
      post_id: id,
    }).then((response) => {
      setUploads(tempLikes);
    });
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
              <Icon symbol = {likes} altName = "likes icon"/>
              <div className="likes"> {val.num_like} likes </div>
            </div>
            {/* <div className="user_caption">
              <strong>{val.user_id} </strong>
              {val.title}
            </div> */}
          </div>
        );
      })}
      </div>
  );
}
export default Post;
