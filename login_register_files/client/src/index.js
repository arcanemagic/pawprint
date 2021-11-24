import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import Login from "./components/Login";
import "./index.css";
import Social from "./components/Social";
import Map from "./components/map";
import Update from "./components/update";
import reportWebVitals from "./reportWebVitals";
import Navigation from "./components/Navigation";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

ReactDOM.render(
  <Router>
    <Navigation />
    <Routes>
      <Route path="/" element={<Map />} />
      <Route path="/update" element={<Update />} />
      <Route path="/social" element={<Social />} />
      <Route path="/register" element={<App />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
