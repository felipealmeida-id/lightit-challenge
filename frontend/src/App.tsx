import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserList from "./pages/PatientList";
import "./App.css";

const App: React.FC = () => {
  localStorage.setItem("patients", "[]");
  return (
    <Router>
      <Routes>
        <Route path="/" Component={UserList} />
      </Routes>
    </Router>
  );
};

export default App;
