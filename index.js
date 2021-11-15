function getURL() {
  let link = localStorage.getItem("url");

  console.log(link);
  return link;
}

function getimage() {
  let number = localStorage.getItem("number");
  let num = number.toString();
  let imageName = "images/Maps/UCLAMAP" + num + ".png";
  console.log(num);
  console.log(imageName);

  return imageName;
}
