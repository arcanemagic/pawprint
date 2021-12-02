import "../css/Search.css";
import "../css/Post.css";
import { useState } from "react";
import Axios from 'axios';
import { Image } from "cloudinary-react";
import likes from "../images/social/powell_cat_likes.png";
import nolikes from "../images/social/powell_cat_nolikes.png";
function Icon(props) {
  return <img className="icon" src={props.symbol} alt={props.altName} />;
}

function Search() {
    const [search, setSearch] = useState("")
    const [yourUploads, setYouruploads] = useState([]);

    const search_user =()=>{
        Axios.get(`https://bruin-pawprint.herokuapp.com/User/${search}`).then((response) => {
        setYouruploads(response.data);
    });
    }

    return(
        <div className="postContainer">
        <h1>Search by User:</h1>
        <div className ="searchs">
        <input className="inputss"
            type="text"
            placeholder="User"
            onChange= {(e) =>{setSearch(e.target.value)}}
        />
        <button onClick={search_user}>Search</button>
        </div>
        <div>
       <div>
      <h1 className= "Name">User:&nbsp;{search}</h1>
      {yourUploads.map((val, key) => {
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
              <div className="likes"> 
              {val.num_like === 0? <Icon symbol={nolikes} altName="nolikes icon" />:
                <Icon symbol={likes} altName="likes icon" />}
              {val.num_like} likes </div>
            </div>
          </div>
        );
      })}
    </div>
    </div>
        </div>
    )
}

export default Search;