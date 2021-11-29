const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
const mysql = require('mysql');

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "05231919",
    database: "userSys",
});

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

//like a post
app.post("/like", (req,res) =>{
    const user_id = req.body.user_id
    const post_id = req.body.post_id

    db.query(
        "INSERT INTO Likes(user_id, post_id) VALUES(?,?) on duplicate key update post_id = ?"
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
         }
    )
})

//since one user can comments many times, no need to check
app.post("/comment", (req,res)=>{
    const comments = req.body.comments
    const user_id = req.body.user_id
    const post_id = req.body.post_id 

    db.query("INSERT INTO comment(comment, user_id, post_id) VALUES(?,?,?)"
    [comments,user_id,post_id],
    (err,res) =>{
        if(err){
            console.log(err);
        }
        res.send(res);
    }
    )
})

//unlike a post, assume user only unlike a post when already likes it. implementation is totally up to frontend
app.post("/unlike", (req,res) =>{
    const user_id = req.body.user_id
    const post_id = req.body.post_id

    db.query("DELETE FROM Likes WHERE user_id = ? AND post_id =?"
    [user_id,post_id],
    (err, res)=>{
        if(err){
            console.log(err)
        }
        db.query("UPDATE posts SET num_like = num_like-1 where id = ?",
             post_id,
             (err2,res2)=>{
                 res.send(res);
             }
             )
    }
    
    )
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
  

app.listen(8000, ()=>{
    console.log("Yey, your server is running in 8000")
});

