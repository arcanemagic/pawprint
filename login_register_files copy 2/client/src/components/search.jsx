import "../css/Search.css";
import { useState } from "react";
import Axios from 'axios';
import { Image } from "cloudinary-react";

function Search() {
    const [search, setSearch] = useState("")
    const [yourUploads, setYouruploads] = useState([]);

    const search_user =()=>{
        Axios.get(`http://localhost:8000/User/${search}`).then((response) => {
        setYouruploads(response.data);
    });
    }

    return(
        <div>
        <div className ="searchs">
        <h1>Search by User: </h1>
        <input className="inputss"
            type="text"
            placeholder="User..."
            onChange= {(e) =>{setSearch(e.target.value)}}
        />
        <button onClick={search_user}>Search</button>
        </div>
        <div>
       <div>
      <h1 className= "name">User:     {search}</h1>
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
        </div>
    )
}

export default Search;