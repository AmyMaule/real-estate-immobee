import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation
} from "react-router-dom";
import './scss/index.scss';

import App from './App';
import Navbar from './components/Navbar';
import SavedListings from './components/SavedListings';

const ScrollTop = ({ children }) => {
  const location = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <>{children}</>;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ScrollTop>
      <Navbar/>
      <Routes>
        <Route exact path="/" element={<App />}/>
        <Route path="/saved-listings" element={<SavedListings />} /> 
      </Routes>
    </ScrollTop>
  </BrowserRouter>
);
