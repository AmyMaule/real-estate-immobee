import React from 'react';

const LoadingAnimation = () => {
  return (
    <div className="loading-screen-container">
      <div className="loading-circle-outer-container">
        <div className="loading-circle-container">
          <div className="house">
            <div className="roof" />
            <div className="chimney" />
            <div className="windows">
              <div className="window">
                <div className="window-shine" />
              </div>
              <div className="window">
                <div className="window-shine" />
              </div>
            </div>
            <div className="door">
              <div className="door-window">
                <div className="window-shine" />
              </div>
            </div>
          </div>
          <div className="bush" />
          <div className="bush" />
          <div className="for-sale-sign" />
          <div className="grass" />
          <div className="road" />
        </div>
        <div className="loading-text">Loading</div>
      </div>
    </div>
  )
}

export default LoadingAnimation;
