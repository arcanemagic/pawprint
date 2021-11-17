const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

app.use(cors());
app.use(express.json());

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

    db.query(
        "INSERT INTO Users (name, username, passwd, email ,uid) VALUES (?,?,?,?,?)", 
        [name, username, passwd, email ,uid], 
        (err,result) =>{
            if(err){
                console.log(err)
            }else{
                res.send("value inserted")
            }
        }
    );
});

app.listen(3001, ()=>{
    console.log("Yey, your server is running in 3001")
});

