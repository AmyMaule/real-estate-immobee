import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import { handlePageChange } from '../utilities';

import { ListingsContext } from '..';

const Home = () => {
  const { setListingIDs } = useContext(ListingsContext);

  // Reset the listingIDs whenever the user visits the homepage
  useEffect(() => {
    handlePageChange(setListingIDs);
  }, []);

  return (
    <div className="hero-section">
      <div className="hero-section-img-container">
        <img src="/homepage-bg.png" className="hero-section-img" alt="" />
      </div>
      <div className="hero-text-container">
        <h1 className="hero-title">Find your dream home</h1>
        <h3 className="hero-subtitle">
          In the heart of Occitanie's extraordinary landscapes,{"\n"}
          your
          <div className="hero-subtitle-highlight">
            ideal home awaits
            <img src="./bee-3.png" className="hero-section-bee" alt="" />
          </div>
        </h3>
        <p className="hero-intro-text">
          ImmoBee is here to <span className="hero-text-highlight">simplify your property search</span> and guide you towards finding the perfect place to call home. With an extensive database comprising more than 20 local agents, ImmoBee is your one-stop destination for hassle-free house hunting in Occitanie.
        </p>
        <Link className="btn btn-hero" to="/search/1">Search now</Link>
      </div>
    </div>
  )
}

export default Home;
