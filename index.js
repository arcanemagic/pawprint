const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
const mysql = require('mysql');

var db_config = {
  host: 'us-cdbr-east-04.cleardb.com',
    user: 'badeb00fe5be21',
    password: 'e0d840f6',
    database: 'heroku_ed6443bb67dd7cb'
};


// mysql://badeb00fe5be21:e0d840f6@us-cdbr-east-04.cleardb.com/heroku_ed6443bb67dd7cb?reconnect=true

const db = mysql.createPool(db_config);

var connection;

function handleDisconnect() {
  connection = mysql.createConnection(db_config); // Recreate the connection, sincethe old one cannot be reused.

  connection.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
  connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.log("FUCKER DISCONNECTED AGAIN") // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
}

handleDisconnect();

app.post("/create", (req, res) => {
    const name = req.body.name;
    const username = req.body.username;
    const passwd = req.body.passwd;
    const email = req.body.email;
    const uid = req.body.uid;
    db.query(
        "INSERT INTO Users (name, username, passwd, email ,uid) VALUES (?,?,?,?,?)", 
        [name, username, passwd, email ,uid], 
      (err, results) => {
        console.log(err);
        res.send(results);
      }
    );
  });
  
  app.post("/login", (req, res) => {
    const username = req.body.username;
    const passwd = req.body.passwd;
  
    db.query(
      "SELECT * FROM Users WHERE username = ?",
      username,
      (err, results) => {
        if (err) {
          console.log(err);
        }
        if (results.length > 0) {
          if (passwd == results[0].passwd) {
            res.json({ loggedIn: true, username: username });
          } else {
            res.json({
              loggedIn: false,
              message: "Wrong username/password combo!",
            });
          }
        } else {
          res.json({ loggedIn: false, message: "User doesn't exist" });
        }
      }
    );
  });

app.post('/updateBuilding', (req, res) => {
    db.query("SELECT * from picid", (err, res) => {
        if (err) throw (err);
        const building = req.body.number;
        db.query("INSERT INTO picid(building) VALUES (?)",[building], (err, res) => {
            if (err) throw (err);
            console.log("updated");
        })
    })
})

app.get('/building', (req, result) => {
    var num = 0;
    db.query("SELECT * from picid", (err, res) => {
        if (err) throw (err);
        db.query("select building from picid where id=(SELECT MAX(id) from picid)", (err, res, fields) => {
                if (err) throw (err);
                num = res[0].building;
                console.log(num);
                result.send({number:num});
            })
    }) 
})

app.post("/post",(req,res) =>{
    console.log(req.body)
    const title = req.body.title;
    const image = req.body.image;
    const author = req.body.author;
    db.query(
        "INSERT INTO posts (title, image, user_id, num_like) VALUES (?,?,?,0)",
        [title, image, author],
        (err, result) =>{
            if(err){
                res.send({err:err});
            }
        }
    )
})

app.get("/social", (req,result) =>{
    db.query("SELECT * FROM posts ORDER BY id DESC", (err, res) =>{
        if(err){
            console.log(err);
        }
        result.send(res);
    })
})

app.get("/liked", (req,res) =>{
  const user = req.query.user
  var ret = [];
  db.query(
      "SELECT post_id FROM Likes WHERE user_id = ?", user, (err, results) => {
          if (err){
              console.log(err);
          }
          else if (results.length > 0){
              for (var i of results) 
                  ret.push(i.post_id);
              console.log(ret)
          }
          res.send(ret)
      }
  )
})

app.post("/like", (req,res) =>{
  const user_id = req.body.user_id
  const post_id = req.body.post_id

  db.query(
      "SELECT * FROM Likes WHERE user_id = ? and post_id = ?", [user_id, post_id], (err, results) => {
          if (err){
              console.log(err);
          }else if (results.length === 0){
              console.log("inserted "+user_id + " "+post_id)
              db.query("INSERT INTO Likes(user_id, post_id) VALUES(?,?)",
              [user_id, post_id],
              (err, result) =>{
                  if(err){
                      console.log(err);
                  }
                  db.query("UPDATE posts SET num_like = num_like+1 where id = ?",
                  post_id,
                  (err2,res2)=>{
                      res.send(result);
                  }
                  )
              })
          }
      
  })
})

app.post("/unlike", (req,res) =>{
  const user_id = req.body.user_id
  const post_id = req.body.post_id

  db.query("DELETE FROM Likes WHERE user_id = ? AND post_id =?",
  [user_id,post_id],
  (err, result)=>{
      if(err){
          console.log(err)
      }
      db.query("UPDATE posts SET num_like = num_like-1 where id = ?",
           post_id,
           (err2,res2)=>{
               res.send(result);
           }
           )
  })
})



app.get("/byUser/:username", (req, res) => {
    console.log("is here?")
    const userName = req.params.username;
    db.query(
      "SELECT * FROM posts WHERE user_id = ?;",
      userName,
      (err, results) => {
        if (err) {
          console.log(err);
        }
        res.send(results);
      }
    );
  });

  app.get("/byTrending", (req, res) => {
    console.log("is here???")
    db.query(
      "SELECT * FROM posts ORDER BY num_like DESC LIMIT 5;",
      (err, results) => {
        if (err) {
          console.log(err);
        }
        console.log(results)
        res.send(results);
      }
    );
  });

  app.get("/User/:username", (req, res) => {
    const userName = req.params.username;
    db.query(
      "SELECT * FROM posts WHERE user_id = ?;",
      userName,
      (err, results) => {
        if (err) {
          console.log(err);
        }
        res.send(results);
      }
    );
  });
  

app.listen(process.env.PORT || 3000);

