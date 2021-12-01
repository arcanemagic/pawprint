import "../css/App.css";
import { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function App() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [passwd, setPasswd] = useState("");
  const [email, setEmail] = useState("");
  const [uid, setUid] = useState(0);
  const [message, setMessage]= useState("");
  let nav = useNavigate();
  const register = () => {
    
    Axios.post("http://localhost:8000/create", {
      name: name,
      username: username,
      passwd: passwd,
      email: email,
      uid: uid,
    }).then((response)=>{
      console.log("does it passed?")
      if(response.data.regStatus){
        alert("Successful register!")
        nav("/login");
      }else{
        setMessage(response.data.message)
      }
    })
  };
 

  return (
    <div className="App">
      <div className="information">
        <label className="register">Register</label>
        <label>Name:</label>
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />

        <label>Username:</label>
        <input
          type="text"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />

        <label>Password:</label>
        <input
          type="text"
          onChange={(event) => {
            setPasswd(event.target.value);
          }}
        />

        <label>Email:</label>
        <input
          type="text"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />

        <label>University ID:</label>
        <input
          type="number"
          onChange={(event) => {
            setUid(event.target.value);
          }}
        />

        <button onClick={register}>Register</button>
        <h1 style={{ color: "red" }}>{message} </h1>
      </div>
    </div>
  );
}

export default App;
