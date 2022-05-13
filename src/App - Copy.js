// App.js
import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Home } from "./Home";
import { PicturePage } from "./PicturePage";
import LandingPage from './landing/LandingPage';
import './App.css';
import logo from './img/applogo.png';

export function App() {
  //<h1>IMMIGRATION INC. </h1>
  return (
    <Routes>
      <Route path="/" element={
        <div>
          <header>
            <a href="/"><img style={{ display: "block", marginLeft: "auto", marginRight: "auto" }} src={logo} width="170px" /></a>
          </header>
          <Home /></div>
      } />
      <Route path="/PicturePage" element={<PicturePage />} />
      <Route path="/landing" element={<LandingPage />} />
    </Routes>
  );
}

export default App;
