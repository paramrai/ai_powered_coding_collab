import React from "react";
import Home from "./screens/Home";
import { Routes, Route } from "react-router-dom";
import CodeGem from "./screens/CodeGem";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/gem" element={<CodeGem />} />
    </Routes>
  );
};

export default App;
