import React from "react";
import Home from "./screens/Home";
import { Routes, Route } from "react-router-dom";
import CodeGem from "./screens/CodeGem";
import Inbox from "./screens/Inbox";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/gem" element={<CodeGem />} />
      <Route path="/inbox" element={<Inbox />} />
    </Routes>
  );
};

export default App;
