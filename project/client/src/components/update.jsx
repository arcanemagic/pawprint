import React, { useState } from "react";
import map from "../images/UCLAMAP.png";
import "./update.css";
import Axios from 'axios';

class Update extends React.Component {
  changeMap(num) {
    alert("you have updated the location");
    Axios.post("http://localhost:3001/updateBuilding", {
      number : num
    }).then(() =>{
      console.log("success");
    }).then((response) => {
      console.log(response);
    });
    console.log("you have updated the location "+num);
  }

  render() {
    const num = 9;
    return (
      <div>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <div className="container">
          <h1>Click where you saw him!</h1>
          <img style={{ maxWidth: "1000px" }} src={map} alt="image" />
          <div className="one" onClick={() => this.changeMap(1)}>
            <i className="material-icons">location_on</i>
          </div>
          <div className="two" onClick={() => this.changeMap(2)}>
            <i className="material-icons">location_on</i>
          </div>
          <div className="three" onClick={() => this.changeMap(3)}>
            <i className="material-icons">location_on</i>
          </div>
          <div className="four" onClick={() => this.changeMap(4)}>
            <i className="material-icons">location_on</i>
          </div>
          <div className="five" onClick={() => this.changeMap(5)}>
            <i className="material-icons">location_on</i>
          </div>
          <div className="six" onClick={() => this.changeMap(6)}>
            <i className="material-icons">location_on</i>
          </div>
          <div className="seven" onClick={() => this.changeMap(7)}>
            <i className="material-icons">location_on</i>
          </div>

          <div className="eight" onClick={() => this.changeMap(8)}>
            <i className="material-icons">location_on</i>
          </div>

          <div className="nine" onClick={() => this.changeMap(9)}>
            <i className="material-icons">location_on</i>
          </div>
          <div className="ten" onClick={() => this.changeMap(10)}>
            <i className="material-icons">location_on</i>
          </div>
          <div className="eleven" onClick={() => this.changeMap(11)}>
            <i className="material-icons">location_on</i>
          </div>

          <div className="twelve" onClick={() => this.changeMap(12)}>
            <i className="material-icons">location_on</i>
          </div>
          <div className="thirteen" onClick={() => this.changeMap(13)}>
            <i className="material-icons">location_on</i>
          </div>
          <div className="fourteen" onClick={() => this.changeMap(14)}>
            <i className="material-icons">location_on</i>
          </div>
          <div className="fifteen" onClick={() => this.changeMap(15)}>
            <i className="material-icons">location_on</i>
          </div>
          <div className="sixteen" onClick={() => this.changeMap(16)}>
            <i className="material-icons">location_on</i>
          </div>
          <div className="seventeen" onClick={() => this.changeMap(17)}>
            <i className="material-icons">location_on</i>
          </div>
          <div className="eighteen" onClick={() => this.changeMap(18)}>
            <i className="material-icons">location_on</i>
          </div>
        </div>
      </div>
    );
  }
}

export default Update;
