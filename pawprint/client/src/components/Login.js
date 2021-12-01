import "../css/Login.css";
import { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [passwd, setPasswd] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  let nav = useNavigate();

  const login = () => {
    if(localStorage.getItem("loggedIn") === "true"){
      alert("Can not login again")
    }else{
    Axios.post("http://localhost:8000/login", {
      username: username,
      passwd: passwd,
    }).then((response) => {
      console.log("response: true")
      if (response.data.loggedIn) {
        localStorage.setItem("loggedIn", true);
        localStorage.setItem("username", response.data.username);
        alert("successful logged in!")
        window.location.reload(false);
        nav("/");
      } else {
        setErrorMessage(response.data.message);
      }
    });
  }
  };

  return (
    <div className="Login">
      <h1 className="registe">Login</h1>
      <div className="information">
      <div className="LoginForm">
        <input
          type="text"
          placeholder="Username..."
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password..."
          onChange={(event) => {
            setPasswd(event.target.value);
          }}
        />
        </div>
        <button onClick={login}>Login</button>
        <h1 style={{ color: "red" }}>{errorMessage} </h1>
      </div>
    </div>
  );
}

export default Login;
