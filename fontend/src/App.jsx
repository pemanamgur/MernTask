import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import ScorePage from "./pages/ScorePage.jsx";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/score" element={<ScorePage />} />
      </Routes>
    </Router>
  );
};

export default App;
