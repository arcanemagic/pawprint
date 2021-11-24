import React, { useState } from "react";
import "../css/Post.css";
import username_logo from "../images/social/username_logo.png";
import comment_symbol from "../images/social/comment_symbol.png";
import nolikes from "../images/social/powell_cat_nolikes.png";
import likes from "../images/social/powell_cat_likes.png";

function Icon(props) {
  return <img className="icon" src={props.symbol} alt={props.altName} />;
}

function Comment(props) {
  return (
    <div>
      <strong>{props.userName}</strong> {props.text}
    </div>
  );
}

function Post(props) {
  const [likeCount, setLikeCount] = useState(0);

  const incrementLikeCount = () => {
    setLikeCount(likeCount + 1);
  };

  const [inputText, setInputText] = useState("");
  const [comments, setComments] = useState([]);

  const updateInputBox = (event) => {
    setInputText(event.target.value);
  };
  const addComment = () => {
    setComments([
      comments,
      <Comment key={inputText} userName={props.accountName} text={inputText} />,
    ]);
    setInputText("");
  };

  return (
    <div className="user_post">
      <div className="username_header">
        <img
          className="username_logo"
          src={username_logo}
          alt="Username logo"
        />
        <strong>{props.username}</strong>
      </div>
      <img
        className="post_image"
        src={props.image}
        alt={props.tag}
        onClick={incrementLikeCount}
      />
      <div className="icons">
        {likeCount === 0 ? (
          <Icon symbol={nolikes} altName="nolikes icon" />
        ) : (
          <Icon symbol={likes} altName="likes icon" />
        )}
        <Icon symbol={comment_symbol} alt="comment icon" />
        <div className="likes">{likeCount} likes</div>
      </div>
      <div className="user_caption">
        <strong>{props.username} </strong>
        {props.caption}
      </div>
      <div className="comments">
        {comments}
        <div>
          <input type="text" value={inputText} onChange={updateInputBox} />
          <button onClick={addComment}>Comment</button>
        </div>
      </div>
    </div>
  );
}

export default Post;
