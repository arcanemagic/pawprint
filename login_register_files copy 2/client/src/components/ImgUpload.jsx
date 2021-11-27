import React, { useState}  from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function ImgUpload() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState([]);

  let history = useNavigate();
  const upload = () =>{
    const formData = new FormData();
    formData.append("file", image[0]);
    formData.append("upload_preset", "t47cisgt");
    Axios.post('https://api.cloudinary.com/v1_1/bruin-pawprint/image/upload',
    formData
    ).then((response) =>{
  
      const fileName = response.data.public_id;
      console.log(fileName)
      Axios.post("https://localhost:8000/post",{
        title: title,
        image:fileName,
        author: "dog",
      }).then(()=>{
       // history.push("/");
      });
    });
  };


  return (
    <div className="ImgUpload">
    <h1>Create a Post</h1>
      <label>Say something:</label>
      <input type="text"
      placeholder="Title..."
      onChange={(event) => {
      setTitle(event.target.value);
          }}
       />

      <input type="file" onChange={(e)=> setImage(e.target.files)}/>
      <button onClick={upload}>Submit</button>
    </div>
  );
}
export default ImgUpload;