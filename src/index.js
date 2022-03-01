import 'panic-overlay';
import React from "react";
import ReactDOM from "react-dom";
import {HashRouter as Router} from 'react-router-dom'
import { App } from "./App";
import mongoose from 'mongoose';

const app = document.getElementById("app");

ReactDOM.render(
    <React.StrictMode>
        <Router><App /></Router>
    </React.StrictMode>,
app);