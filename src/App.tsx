import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Login } from "./pages/login";
import { Main } from "./pages/main/main";
import { Navbar } from "./components/navbar";
import { CreatPost } from "./pages/creat-post/CreatPost";
import { auth } from "./config/firebase";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />

          <Route path="/login" element={<Login />} />

          <Route path="/creatpost" element={<CreatPost />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
