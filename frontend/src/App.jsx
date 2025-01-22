import React from "react";
import Home from "./screens/Home";
import { Routes, Route } from "react-router-dom";
import CodeGem from "./screens/CodeGem";
import NotFound from "./components/NotFound";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gem/:gemName" element={<CodeGem />} />
        <Route path="*" element={<NotFound msg={"Oops Page Not Found !"} />} />
      </Routes>
    </>
  );
};

export default App;
