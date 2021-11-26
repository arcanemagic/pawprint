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
app.use(cors());
// app.use(cors({
//     origin: ["http://localhost:3000"],
//     methods: ["GET", "POST"],
//     credentials:true
// }));
// app.use(cookieParser());
// app.use(bodyParser.urlencoded({extended:true}));

// app.use(session({
//     key: "userID",
//     secret: "ITSASECRETE",
//     resave:false,
//     saveUninitialized:false,
//     cookie:{
//          expires: 60*60*12, // exppire 12 hours
//     },
//  })
// );

const db = mysql.createConnection({
    user: "newuser",
    host: "localhost",
    password: "1234",
    database: "userDB"
});

// app.post('/create',(req, res) => {
//     const name = req.body.name;
//     const username = req.body.username;
//     const passwd = req.body.passwd;
//     const email = req.body.email;
//     const uid = req.body.uid;

//     bcrypt.hash(passwd,saltRounds,(err, hash) =>{
//         if(err){
//             console.log(err)
//         }
//          db.query(
//         "INSERT INTO Users (name, username, passwd, email ,uid) VALUES (?,?,?,?,?)", 
//         [name, username, hash, email ,uid], 
//         (err,result) =>{
//             console.log(err);
//         }
//     );
//     })
   
// });

// app.get("/login",(req,res) =>{
//     if(req.session.user){
//         res.send({loggedIn: true, user:req.session.user});
//     }else{
//         res.send({loggedIn: false});
//     }
// })

// app.post('/login',(req, res) => {
//     const username = req.body.username;
//     const passwd = req.body.passwd;

//     db.query(
//         "SELECT username, passwd FROM Users WHERE username = ?;", 
//         username, 
//         (err,result) =>{
//             if(err){
//                 res.send({err:err});
                
//             }
//             if(result.length > 0){
//                 bcrypt.compare(passwd, result[0].passwd, (error, response) =>{
//                     if(response){
//                         req.session.user = result;
//                         console.log(req.session.user);
//                         res.send(result)
//                     }else{
//                         res.send({message:"Wrong username/password combination!" });
//                     }
//                 })
//             }else{
//                 res.send({message:"User doesn't exist!" });
//             }
//         }
//     );
// });

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

app.listen(3001, ()=>{
    console.log("Yey, your server is running in 3001")
});

