import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Assistant from "./components/Assistant";

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/assistant" element={<Assistant />} />

      {/* <Route path="/" element={<AgentLogin />} />
      <Route path="/lookup" element={<MemberLookup />} />
      <Route path="/assistant" element={<CallAssistant />} /> */}
    </Routes>
  </Router>
);

export default App;