// App.js
import React, { Suspense, lazy } from 'react';
import { Routes, Route, Link } from "react-router-dom";
const Home = lazy(() => import('.//Home'));
const LandingPage = lazy(() => import('./landing/LandingPage'));
const PicturePage = lazy(() => import('./PicturePage'));
import logo from './img/applogo.png';

export function App() {
  //<h1>IMMIGRATION INC. </h1>
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/site" element={
          <div>
            <header>
              <a href="https://immigrationinc.info/"><img style={{ display: "block", marginLeft: "auto", marginRight: "auto" }} src={logo} width="170px" /></a>
            </header>
            <Home /></div>
        } />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
