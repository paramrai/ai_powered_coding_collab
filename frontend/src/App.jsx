import React from "react";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Project from "./screens/Project";
import UserAuth from "./auth/UserAuth";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/project" element={<Project />} />
    </Routes>
  );
};

export default App;
