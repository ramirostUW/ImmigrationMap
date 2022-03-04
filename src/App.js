// App.js
import mongoose from "mongoose";
import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Home } from "./Home";
import { PicturePage } from "./PicturePage";
import './App.css';

export function App() {

  return (
    <div>
      <img src="public/imgs/applogo.png" />
      <header>
      <h1>IMMIGRATION INC. </h1>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="PicturePage" element={<PicturePage />} />
      </Routes>
    </div>
  );
}

export default App;
