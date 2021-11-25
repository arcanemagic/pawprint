const express = require('express');
const { response } = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');


const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const bcrypt = require('bcrypt');
const saltRounds = 10;

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials:true
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));

app.use(session({
    key: "userID",
    secret: "ITSASECRETE",
    resave:false,
    saveUninitialized:false,
    cookie:{
         expires: 60*60*2, // exppire 2 hours
    },
 })
);

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "05231919",

    database: "userSys",
});

app.post('/create',(req, res) => {
    const name = req.body.name;
    const username = req.body.username;
    const passwd = req.body.passwd;
    const email = req.body.email;
    const uid = req.body.uid;

    bcrypt.hash(passwd,saltRounds,(err, hash) =>{
        if(err){
            console.log(err)
        }
         db.query(
        "INSERT INTO Users (name, username, passwd, email ,uid) VALUES (?,?,?,?,?)", 
        [name, username, hash, email ,uid], 
        (err,result) =>{
            console.log(err);
        }
    );
    })
   
});

app.get("/login",(req,res) =>{
    if(req.session.user){
        res.send({loggedIn: true, user:req.session.user});
    }else{
        res.send({loggedIn: false});
    }
})

app.post('/login',(req, res) => {
    const username = req.body.username;
    const passwd = req.body.passwd;

    db.query(
        "SELECT username, passwd FROM Users WHERE username = ?;", 
        username, 
        (err,result) =>{
            if(err){
                res.send({err:err});
                
            }
            if(result.length > 0){
                bcrypt.compare(passwd, result[0].passwd, (error, response) =>{
                    if(response){
                        req.session.user = result;
                        console.log(req.session.user);
                        res.send(result)
                    }else{
                        res.send({message:"Wrong username/password combination!" });
                    }
                })
            }else{
                res.send({message:"User doesn't exist!" });
            }
        }
    );
});


// for upload post 

app.post("/uploadPost", (req,res) => {
    const title = req.body.title;
    const description = req.body.description
    const image = req.body.image
    const author = req.body.author

    db.query(
        "INSERT INTO posts (title, description, image, author) VALUE (?, ?, ?, ?);",
        [title, description, image, author],
        (err, results) => {
            console.log(err);
            res.send(result);
        }
    );
});

//also for posts to show up
app.get("/??", (req, res) => {
    db.query("SELECT * FROM posts", (err, results) => {
      if (err) {
        console.log(err);
      }
      res.send(results);
    });
  });

app.get("/User/:username", (req, res) => {
    const username = req.params.username;
    db.query(
      "SELECT * FROM posts WHERE author = ?;",
      username,
      (err, results) => {
        if (err) {
          console.log(err);
        }
        res.send(results);
      }
    );
  });

  router.post("/like", (req, res) => {
    const userLike = req.body.userLike;
    const postid = req.body.postid;
  
    db.query(
      "INSERT INTO Likes (userLike, postid) VALUES (?,?)",
      [userLike, postid],
      (err, results) => {
        if (err) {
          console.log(err);
        }
        db.query(
          "UPDATE Uploads SET likes = likes + 1 WHERE id = ?",
          postId,
          (err2, results2) => {
            res.send(results);
          }
        );
      }
    );
  });



app.listen(3001, ()=>{
    console.log("Yey, your server is running in 3001")
});

