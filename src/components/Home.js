import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="hero-section">
      <div className="hero-section-img-container">
        <img src="/house5.png" className="hero-section-img" />
      </div>
      <div className="hero-text-container">
        <h1 className="hero-title">Find your dream home</h1>
        <h3 className="hero-subtitle">
          In the heart of Occitanie's extraordinary landscapes,{"\n"}
          let your dreams
          <div className="hero-subtitle-highlight">
            take flight
            <img src="./bee3.png" className="hero-section-bee" />
          </div>
        </h3>
        <p className="hero-intro-text">
          {/* Say goodbye to endless scrolling and countless website tabs -  */}
          ImmoBee is here to <span className="hero-text-highlight">simplify your property search</span> and guide you towards finding the perfect place to call home. With an extensive database comprising 19 local agents, ImmoBee is your one-stop destination for hassle-free house hunting in Occitanie.
        </p>
        <Link className="btn-hero" to="/search">Search now</Link>
      </div>
    </div>
  )
}

export default Home;
