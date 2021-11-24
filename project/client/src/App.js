import './App.css';
import {useState} from "react";
import Axios from 'axios'

function App() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [passwd, setPasswd] = useState("");
  const [email, setEmail] = useState("");
  const [uid, setUid] = useState(0);


  const register = () => {
    Axios.post("http://localhost:3001/create", {
      name:name,
      username:username, 
      passwd:passwd,
      email:email,
      uid:uid
    }).then(() =>{
      console.log("success");
    }).then((response) => {
      console.log(response);
    });
  };

  return (
    <div className="App">
    <div className="information">
    <label className="register">Register</label>
      <label>Name:</label>
      <input type="text" 
        onChange={(event) =>
          {setName(event.target.value);
          }}
          />
     
      <label>Username:</label>
      <input type="text" 
        onChange={(event) =>
          {setUsername(event.target.value);
          }}
          />

      <label>Password:</label>
      <input type="text" 
        onChange={(event) =>
          {setPasswd(event.target.value);
          }}
          />

      <label>Email:</label>
      <input type="text" 
        onChange={(event) =>
          {setEmail(event.target.value);
          }}
          />

      <label>University ID:</label>
      <input type="number" 
        onChange={(event) =>
          {setUid(event.target.value);
          }}
          />

      <button onClick={register}>Register</button>
    </div>
    </div>
  );
}

export default App;
