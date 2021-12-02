const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
const mysql = require('mysql');

const db = mysql.createPool({
    // host: 'localhost',
    // user: 'newuser',
    // password: '1234',
    // database: 'userDB'
    host: 'us-cdbr-east-04.cleardb.com',
    user: 'badeb00fe5be21',
    password: 'e0d840f6',
    database: 'heroku_ed6443bb67dd7cb'

});

app.post("/create", (req, res) => {
  const name = req.body.name;
  const username = req.body.username;
  const passwd = req.body.passwd;
  const email = req.body.email;
  const uid = req.body.uid;
  db.query("SELECT * FROM Users WHERE username = ?",
  username,
  (err1, result1)=>{
    if(err1){
      console.log(err1);
    }
    if(result1.length === 0){
      db.query(
      "INSERT INTO Users (name, username, passwd, email ,uid) VALUES (?,?,?,?,?)",
      [name, username, passwd, email ,uid],
    (err2, results2) => {
      console.log(err2);
      res.json({
        regStatus: true,
        message: "Successfully register!"})
    }
  );
    }else{
      res.json({
        regStatus: false,
        message: "Username already taken!"})
    }
  })
 
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
          console.log("inserted")
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
          else{
              for (var i of results) 
                  ret.push(i.post_id);
              res.send(ret)
          }
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
              db.query("INSERT INTO Likes(user_id, post_id) VALUES(?,?)",
              [user_id, post_id],
              (err, result) =>{
                  if(err){
                      console.log(err);
                  }
                  db.query("UPDATE posts SET num_like = num_like+1 where id = ?",
                  post_id,
                  (err2,res2)=>{
                      // res.send(result);
                  }
                  )
              })
          }
      
  })
  const ret = [];
  db.query(
      "SELECT post_id FROM Likes WHERE user_id = ?", user_id, (err, results) => {
          if (err){
              console.log(err);
          }
          else{
              for (const i of results) 
                  ret.push(i.post_id);
              ret.push(post_id)
              res.send(ret)
          }
      }
  )
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
           }
           )
  })
  var ret = [];
  db.query(
      "SELECT post_id FROM Likes WHERE user_id = ?", user_id, (err, results) => {
          if (err){
              console.log(err);
          }
          else{
              for (var i of results) {
                  if (i.post_id!==post_id){
                    ret.push(i.post_id);
                  }
              }
              console.log("unlike: "+ ret)
              res.send(ret)
          }
      }
  )
})



app.get("/byUser/:username", (req, res) => {
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
  
  app.post("/delete", (req,res)=>{
    const id = req.body.id;
    const username = req.body.username;
    db.query("DELETE FROM posts WHERE id = ?;",
    id,
    (err, result)=>{
      if(err){
        console.log(err)
      }
      if(result){
        db.query("SELECT * FROM posts WHERE user_id = ?;",
        username,
        (err1,result1)=>{
          if(err1){
            console.log(err1)
          }
          if(result1){
            res.send(result1)
          }
        }
        )
      }
    }
    )
  })

app.listen(process.env.PORT || 8000, ()=>{
    console.log("Yey, your server is running in 8000")
});
