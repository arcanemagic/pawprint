import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Display from "./components/Display";
import Update from "./components/update";
import App from "./components/App";
import Login from "./components/Login";
import ImgUpload from "./components/ImgUpload";
import Profile from "./components/profile";
import Search from "./components/search";
import Post from "./components/Post";
import Trending from "./components/Trending"
import GlobalStyle from "./globalStyles";

ReactDOM.render(
  <Router>
    <GlobalStyle />
    <Display />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/update" element={<Update />} />
      <Route path="/register" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/create" element={<ImgUpload />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/search" element={<Search />} />
      <Route path="/post" element={<Post />} />
      <Route path="/trending" element={<Trending />} />
    </Routes>
  </Router>,
  document.getElementById("root")
);
