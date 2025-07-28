import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Assistant from "./components/Assistant";
import { LoggerPanel } from "./components/LoggerPanel";

const App: React.FC = () => (
  <div>
    {process.env.NODE_ENV === "development" && <LoggerPanel />}
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/assistant" element={<Assistant />} />

        {/* <Route path="/" element={<AgentLogin />} />
        <Route path="/lookup" element={<MemberLookup />} />
        <Route path="/assistant" element={
          <BrowserRouter>
            <CallAssistant />} /> 
          </BrowserRouter>
            */}
      </Routes>
    </Router>
  </div>
);

export default App;