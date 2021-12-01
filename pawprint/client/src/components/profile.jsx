import React, { useEffect, useState } from "react";
import "../css/Post.css";
import nolikes from "../images/social/powell_cat_nolikes.png";
import likes from "../images/social/powell_cat_likes.png";
import Axios from 'axios';
import { Image } from "cloudinary-react";

function Icon(props) {
  return <img className="icon" src={props.symbol} alt={props.altName} />;
}

function Profile() {
  const [yourUploads, setYouruploads] = useState([]);
  const [name, setName] = useState("")

  useEffect(()=>{
    if(localStorage.getItem("loggedIn") === "false"){
      setName("Please login to view your profile");
    }else{
      setName('Name: '+localStorage.getItem("username"));
    }
    console.log("name: "+name)
  })

  useEffect(() => {
    Axios.get(`http://localhost:8000/byUser/${localStorage.getItem("username")}`).then((response) => {
        setYouruploads(response.data);
    });
  }, []);

  const delete_post1 = (id,key) => {
    console.log("is here in id?"+ id)
    Axios.post('http://localhost:8000/delete', {
      id:id,
      username:localStorage.getItem("username")
    })
    .then((response)=>{
      alert("Sucessfully deleted!");
      setYouruploads(response.data);
    })
  }



  return (
    <div className="postContainer">
      <div>
        <h1 className="Name">{name}</h1>
        {yourUploads.map((val, key) => {
        return (
          <div className="user_post">
            <div className="username_header">
              <strong>{val.user_id}</strong>
            </div>
            <div className="post_image">
              <Image cloudName="bruin-pawprint" publicId={val.image} />
            </div>
            <div className="likes"> 
              {
                val.num_like === 0? <Icon symbol={nolikes} altName="nolikes icon" />:
                <Icon symbol={likes} altName="likes icon" />
              }
              {val.num_like} likes
            </div>
            <div className="user_caption">
              {" "}
              <strong>{val.user_id}</strong> {" "} {val.title}
            </div>
            <div className="delete_post">
              <button onClick={()=>{delete_post1(val.id,key)}}>
                Delete Post
              </button>
            </div>
          </div>
        );
      })}
    </div>
    </div>
  );
}
export default Profile;
