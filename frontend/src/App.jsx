import React from "react";
import { Routes, Route } from "react-router-dom";

// component
import Home from "./screens/Home";
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
