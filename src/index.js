import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import './scss/index.scss';

import App from './App';
import Navbar from './components/Navbar';
import SavedListings from './components/SavedListings';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route exact path="/" element={<App />}/>
      <Route path="/search/:page" element={<App />} />
      <Route path="/saved-listings/:page?" element={<SavedListings />} />
      {/* <Route path="/saved-listings" element={<SavedListings />}>
        <Route index element={<SavedListings />} />
        <Route path=":page" element={<SavedListings />} />
      </Route> */}
    </Routes>
  </BrowserRouter>
);
