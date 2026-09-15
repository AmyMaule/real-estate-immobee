import React, { createContext, useState } from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes
} from "react-router-dom";
import './assets/scss/index.scss';

import App from './App';
import Contact from './components/pages/Contact';
import ErrorPage from './components/pages/ErrorPage';
import Footer from './components/layout/Footer';
import Home from './components/pages/Home';
import ListingDetail from './components/listings/ListingDetail';
import Navbar from './components/layout/Navbar';
import SavedListings from './components/listings/SavedListings';

const root = ReactDOM.createRoot(document.getElementById('root'));

export const ListingsContext = createContext();

export const ListingsProvider = ({ children }) => {
  const [listingsData, setlistingsData] = useState(null);

  return (
    <ListingsContext.Provider value={{ listingsData, setlistingsData }}>
      {children}
    </ListingsContext.Provider>
  );
};

root.render(
  <BrowserRouter>
    <ListingsProvider>
    <div className="page-container">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/search" element={<App />} />
        <Route path="/search/:page" element={<App />} />
        <Route path="/saved-listings/:page" element={<SavedListings />} />
        <Route path="/listings/:id" element={<ListingDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="*" element={<Navigate replace to="/error" />} />
      </Routes>
      <Footer />
    </div>
    </ListingsProvider>
  </BrowserRouter>
);
