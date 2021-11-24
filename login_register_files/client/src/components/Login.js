import "../css/App.css";
import { useEffect, useState } from "react";
import Axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [passwd, setPasswd] = useState("");

  const [loginStatus, setLoginStatus] = useState("");
  Axios.defaults.withCredentials = true;

  const checklogin = () => {
    Axios.post("http://localhost:3001/login", {
      username: username,
      passwd: passwd,
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message);
      } else {
        setLoginStatus(response.data[0].username);
      }
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn === true) {
        setLoginStatus(response.data.user[0].username);
      }
    });
  }, []);

  return (
    <div className="App">
      <div className="information">
        <label className="register">Log in</label>
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

        <button onClick={checklogin}>Log in</button>
      </div>
      <h1>{loginStatus}</h1>
    </div>
  );
}

export default Login;
