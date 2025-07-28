import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Assistant from "./components/Assistant";
import { LoggerPanel } from "./components/LoggerPanel";

const App: React.FC = () => (
  <>
    {process.env.NODE_ENV === "development" && <LoggerPanel />}
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/assistant" element={<Assistant />} />
    </Routes>
  </>
);

export default App;
