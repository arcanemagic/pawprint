import React, { useState } from "react";
import one from "../images/maps/PowellCatLocation-1.jpg";
import two from "../images/maps/PowellCatLocation-2.jpg";
import three from "../images/maps/PowellCatLocation-03.jpg";
import four from "../images/maps/PowellCatLocation-04.jpg";
import five from "../images/maps/PowellCatLocation-05.jpg";
import six from "../images/maps/PowellCatLocation-06.jpg";
import seven from "../images/maps/PowellCatLocation-07.jpg";
import eight from "../images/maps/PowellCatLocation-08.jpg";
import nine from "../images/maps/PowellCatLocation-09.jpg";
import ten from "../images/maps/PowellCatLocation-10.jpg";
import eleven from "../images/maps/PowellCatLocation-11.jpg";
import twelve from "../images/maps/PowellCatLocation-12.jpg";
import thirteen from "../images/maps/PowellCatLocation-13.jpg";
import fourteen from "../images/maps/PowellCatLocation-14.jpg";
import fifteen from "../images/maps/PowellCatLocation-15.jpg";
import sixteen from "../images/maps/PowellCatLocation-16.jpg";
import seventeen from "../images/maps/PowellCatLocation-17.jpg";
import eighteen from "../images/maps/PowellCatLocation-18.jpg";
import Axios from 'axios'
import "../css/Post.css";

const imagesPath = [
  one,
  two,
  three,
  four,
  five,
  six,
  seven,
  eight,
  nine,
  ten,
  eleven,
  twelve,
  thirteen,
  fourteen,
  fifteen,
  sixteen,
  seventeen,
  eighteen,
];

const urlArr = [
  "https://www.google.com/maps/place/34%C2%B004'22.8%22N+118%C2%B026'40.3%22W/@34.073003,-118.4467127,530m/data=!3m2!1e3!4b1!4m5!3m4!1s0x0:0x0!8m2!3d34.073003!4d-118.444524",
  "https://www.google.com/maps/place/34%C2%B004'22.8%22N+118%C2%B026'37.0%22W/@34.072992,-118.4458027,530m/data=!3m2!1e3!4b1!4m5!3m4!1s0x0:0x0!8m2!3d34.072992!4d-118.443614",
  "https://www.google.com/maps/place/34%C2%B004'21.1%22N+118%C2%B026'40.4%22W/@34.072533,-118.4467297,530m/data=!3m2!1e3!4b1!4m5!3m4!1s0x0:0x0!8m2!3d34.072533!4d-118.444541",
  "https://www.google.com/maps/place/34%C2%B004'21.0%22N+118%C2%B026'37.1%22W/@34.072493,-118.4458147,530m/data=!3m2!1e3!4b1!4m5!3m4!1s0x0:0x0!8m2!3d34.072493!4d-118.443626",
  "https://www.google.com/maps/place/34%C2%B004'19.9%22N+118%C2%B026'41.2%22W/@34.072182,-118.4469607,530m/data=!3m2!1e3!4b1!4m5!3m4!1s0x0:0x0!8m2!3d34.072182!4d-118.444772",
  "https://www.google.com/maps/place/34%C2%B004'19.9%22N+118%C2%B026'38.8%22W/@34.072202,-118.4462957,530m/data=!3m2!1e3!4b1!4m5!3m4!1s0x0:0x0!8m2!3d34.072202!4d-118.444107",
  "https://www.google.com/maps/place/34%C2%B004'18.2%22N+118%C2%B026'40.3%22W/@34.071724,-118.4467247,530m/data=!3m2!1e3!4b1!4m5!3m4!1s0x0:0x0!8m2!3d34.071724!4d-118.444536",
  "https://www.google.com/maps/place/34%C2%B004'17.9%22N+118%C2%B026'37.1%22W/@34.071633,-118.4458347,530m/data=!3m2!1e3!4b1!4m5!3m4!1s0x0:0x0!8m2!3d34.071633!4d-118.443646",
  "https://www.google.com/maps/place/34%C2%B004'20.0%22N+118%C2%B026'34.9%22W/@34.072211,-118.4452097,530m/data=!3m2!1e3!4b1!4m5!3m4!1s0x0:0x0!8m2!3d34.072211!4d-118.443021",
  "https://www.google.com/maps/place/34%C2%B004'17.8%22N+118%C2%B026'35.7%22W/@34.071611,-118.4443443,265m/data=!3m2!1e3!4b1!4m6!3m5!1s0x0:0x0!7e2!8m2!3d34.0716111!4d-118.4432499",
  "https://www.google.com/maps/place/34%C2%B004'23.7%22N+118%C2%B026'32.9%22W/@34.073249,-118.4430262,132m/data=!3m2!1e3!4b1!4m14!1m7!3m6!1s0x0:0x0!2zMzTCsDA0JzIwLjAiTiAxMTjCsDI2JzM0LjkiVw!3b1!8m2!3d34.072211!4d-118.443021!3m5!1s0x0:0x0!7e2!8m2!3d34.0732494!4d-118.4424789",
  "https://www.google.com/maps/place/34%C2%B004'23.9%22N+118%C2%B026'29.9%22W/@34.073318,-118.4421972,132m/data=!3m2!1e3!4b1!4m6!3m5!1s0x0:0x0!7e2!8m2!3d34.0733179!4d-118.4416502",
  "https://www.google.com/maps/place/34%C2%B004'21.5%22N+118%C2%B026'33.9%22W/@34.072631,-118.4432942,132m/data=!3m2!1e3!4b1!4m6!3m5!1s0x0:0x0!7e2!8m2!3d34.0726315!4d-118.442747",
  "https://www.google.com/maps/place/34%C2%B004'21.2%22N+118%C2%B026'30.0%22W/@34.072542,-118.4422002,132m/data=!3m2!1e3!4b1!4m6!3m5!1s0x0:0x0!7e2!8m2!3d34.0725421!4d-118.4416527",
  "https://www.google.com/maps/place/34%C2%B004'18.9%22N+118%C2%B026'33.3%22W/@34.071915,-118.4431392,132m/data=!3m2!1e3!4b1!4m6!3m5!1s0x0:0x0!7e2!8m2!3d34.0719155!4d-118.4425918",
  "https://www.google.com/maps/place/34%C2%B004'18.9%22N+118%C2%B026'29.9%22W/@34.071906,-118.4421812,132m/data=!3m2!1e3!4b1!4m15!1m8!3m7!1s0x0:0x0!2zMzTCsDA0JzE4LjkiTiAxMTjCsDI2JzMzLjMiVw!3b1!7e2!8m2!3d34.0719155!4d-118.4425918!3m5!1s0x0:0x0!7e2!8m2!3d34.0719056!4d-118.4416338",
  "https://www.google.com/maps/place/34%C2%B004'15.8%22N+118%C2%B026'33.4%22W/@34.071048,-118.4431572,132m/data=!3m2!1e3!4b1!4m6!3m5!1s0x0:0x0!7e2!8m2!3d34.0710476!4d-118.4426103",
  "https://www.google.com/maps/place/34%C2%B004'16.4%22N+118%C2%B026'30.4%22W/@34.071208,-118.4423262,132m/data=!3m2!1e3!4b1!4m6!3m5!1s0x0:0x0!7e2!8m2!3d34.071208!4d-118.4417785",
];

const locArr = [
  "Kaufman Hall",
  "Kaufman Hall",
  "Kaufman Hall",
  "Kaufman Hall",
  "Wallis Annenburg",
  "Wilson Plaza",
  "Student Activities Center",
  "Student Activities Center",
  "Janss Steps",
  "Janss Steps",
  "Royce Hall",
  "Royce Hall",
  "Royce Hall",
  "Royce Hall",
  "Powell Library",
  "Powell Library",
  "Powell Library",
  "Powell Library",
];

async function getImage(){
  const res =  await Axios.get('https://bruin-pawprint.herokuapp.com/building')
  console.log("getimage"+res.data.number)
  return res.data.number;
};

const Map = () =>{
  const [image, setImage]= useState(0);

  (async () => {
    var num = await getImage()
    setImage(num)
    console.log("num is " +num)
  })()
  
  return(
      <div className="update">
        <div className="powell">
          <span>Powell Cat was last seen at:</span>
          <div>{locArr[image - 1]}</div>
        </div>
        <a href={urlArr[image - 1]} className="Take">Take me to Powell Cat</a>
        <br />
        <img
          style={{ maxWidth: "1000px" }}
          src={imagesPath[image - 1]}
          alt="image"
        />
      </div>
    );
}

export default Map;