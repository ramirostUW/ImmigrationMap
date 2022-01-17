// App.js
import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Home } from "./Home";
import { PicturePage } from "./PicturePage";

export function App() {
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


export default App;