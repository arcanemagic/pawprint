const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const { response } = require('express');

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
         expires: 60*60*2, // exppire 12 hours
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
    const title = req.body.title;
    const image = req.body.image;
    const author = req.body.author;

    db.query(
        "INSERT INTO posts (title, image, useer_id) VALUES (?,?,?)",
        [title, image, author],
        (err, result) =>{
            if(err){
                res.send({err:err});
            }
        }
    )
})

app.get("/social", (req,res) =>{
    db.query("SELECT * FROM posts", (err, res) =>{
        if(err){
            res.send({err:err});
        }
        res.send(res);
    })
})

//like a post
app.post("/like", (req,res) =>{
    const user_id = req.body.user_id
    const post_id = req.body.post_id

    db.query(
        "INSERT INTO Likes(user_id, post_id) VALUES(?,?) on duplicate key update post_id = ?"
         [user_id, post_id],
         (err, res) =>{
             if(err){
                console.log(err);
             }
             db.query("UPDATE posts SET num_like = num_like+1 where id = ?",
             post_id,
             (err2,res2)=>{
                 res.send(res);
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

app.listen(3001, ()=>{
    console.log("Yey, your server is running in 3001")
});

