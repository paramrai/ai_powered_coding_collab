import React from "react";
import Home from "./screens/Home";
import { Routes, Route } from "react-router-dom";
import SignInForm from "./components/SignInForm";
import Projects from "./screens/Projects";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SignInForm />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
};

export default App;
