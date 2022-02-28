// App.js
import mongoose from "mongoose";
import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Home } from "./Home";
import { PicturePage } from "./PicturePage";
import './App.css';

export function App() {
  connectToDb()

  return (
    <div>
      <header>
        <h1>Immigration Map</h1>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="PicturePage" element={<PicturePage />} />
      </Routes>
    </div>
  );
}

async function connectToDb() {
  await mongoose.connect('mongodb+srv://ramirost:ramirost@cluster0.tlydu.mongodb.net/infoCapstone?retryWrites=true&w=majority')
  const CrimeData = new mongoose.Schema({
    key: String,
    value: BigInt
  });
}

export default App;