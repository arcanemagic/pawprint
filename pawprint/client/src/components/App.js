import "../css/App.css";
import { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";

function App() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [passwd, setPasswd] = useState("");
  const [email, setEmail] = useState("");
  const [uid, setUid] = useState(0);
  const [message, setMessage]= useState("");
  let nav = useNavigate();
  const register = () => {
    
    Axios.post("https://bruin-pawprint.herokuapp.com/create", {
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
        <h1 className="register">Register</h1>
        <input
          type="text"
          placeholder="Name"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Username"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Password"
          onChange={(event) => {
            setPasswd(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          type="number"
          placeholder="University ID"
          onChange={(event) => {
            setUid(event.target.value);
          }}
        />

        <Button onClick={register} primary="true">Register</Button>
        <h1 style={{ color: "red" }}>{message} </h1>
      </div>
    </div>
  );
}

export default App;
