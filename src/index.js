import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import './assets/scss/index.scss';

import App from './App';
import Home from './components/Home';
import Navbar from './components/Navbar';
import SavedListings from './components/SavedListings';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route exact path="/" element={<Home />}/>
      <Route exact path="/search" element={<App allowAdvanced />} />
      <Route path="/search/:page" element={<App />} />
      <Route path="/saved-listings/:page?" element={<SavedListings />} />
    </Routes>
  </BrowserRouter>
);
