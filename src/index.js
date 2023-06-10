import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes
} from "react-router-dom";
import './assets/scss/index.scss';

import App from './App';
import ErrorPage from './components/ErrorPage';
import Home from './components/Home';
import ListingDetail from './components/ListingDetail';
import Navbar from './components/Navbar';
import SavedListings from './components/SavedListings';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route exact path="/" element={<Home />}/>
      <Route exact path="/search" element={<App />} />
      <Route exact path="/search/:page" element={<App />} />
      <Route exact path="/saved-listings/" element={<SavedListings />} />
      <Route exact path="/saved-listings/:page?" element={<SavedListings />} />
      <Route exact path="/listings/:id" element={<ListingDetail />} />
      <Route path="/error" element={<ErrorPage />} />
      <Route path="*" element={<Navigate replace to="/error" />} />
    </Routes>
  </BrowserRouter>
);
