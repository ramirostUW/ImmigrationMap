// App.js
import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Home } from "./Home";
import { PicturePage } from "./PicturePage";
import './App.css';
import logo from './img/applogo.png';

export function App() {
  //<h1>IMMIGRATION INC. </h1>
  return (
    <div>
      <header>
      <img style={{marginLeft:"30px"}} src={logo} width="170px"/>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="PicturePage" element={<PicturePage />} />
      </Routes>
    </div>
  );
}

export default App;
