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
import Contact from './components/Contact';
import ErrorPage from './components/ErrorPage';
import Footer from './components/Footer';
import Home from './components/Home';
import ListingDetail from './components/ListingDetail';
import Navbar from './components/Navbar';
import SavedListings from './components/SavedListings';

const root = ReactDOM.createRoot(document.getElementById('root'));

export const ListingsContext = createContext();

export const ListingsProvider = ({ children }) => {
  const [listingIDs, setListingIDs] = useState([]);

  return (
    <ListingsContext.Provider value={{ listingIDs, setListingIDs }}>
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
        <Route exact path="/" element={<Home />}/>
        <Route exact path="/search" element={<App />} />
        <Route exact path="/search/:page" element={<App />} />
        <Route exact path="/saved-listings/:page" element={<SavedListings />} />
        <Route exact path="/listings/:id" element={<ListingDetail />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="*" element={<Navigate replace to="/error" />} />
      </Routes>
      <Footer />
    </div>
    </ListingsProvider>
  </BrowserRouter>
);
