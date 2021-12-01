import React, { useState}  from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/Image.css";

function ImgUpload() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState([]);

  const upload = () =>{
    if (localStorage.getItem("loggedIn") == "false"){
      console.log("here")
      alert("Please log in to post!")
    }
    else{
      const formData = new FormData();
      formData.append("file", image[0]);
      formData.append("upload_preset", "t47cisgt");
      Axios.post('https://api.cloudinary.com/v1_1/bruin-pawprint/image/upload',
      formData
      ).then((response) =>{
    
      const fileName = response.data.public_id;
      console.log(fileName)
      Axios.post("https://bruin-pawprint.herokuapp.com/post",{
        title: title,
        image:fileName,
        author: localStorage.getItem("username"),
      })
    });
    alert("Successfully posted!")
  };
  }

  return (
      <div className="ImgUpload">
        <h1>Create a Post</h1>
        <input type="text"
          placeholder="Caption"
          onChange={(event) => {
          setTitle(event.target.value);
            }}
       />

        <input type="file" onChange={(e)=> setImage(e.target.files)}/>
        <button onClick={upload}>Create</button>
      </div>
  );
}
export default ImgUpload;