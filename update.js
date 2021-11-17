let currentLoc = {
  number: 0,
  url: "",
};

let numberArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
let urlArr = [
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

let locArr = [
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
console.log(currentLoc.number);

function changemap(number) {
  currentLoc.number = number;
  localStorage.setItem("url", urlArr[number - 1]);
  localStorage.setItem("number", number);
  localStorage.setItem("location", locArr[number - 1]);
  currentLoc.url = urlArr[number - 1];
  let num = number.toString();
  let imageName = "images/Maps/UCLAMAP" + num + ".png";
  console.log(imageName);
  console.log(currentLoc);
}

function getURL() {
  let link = localStorage.getItem("url");
  console.log(link);
  return link;
}

function popup() {
  alert("you have updated the location");
}
