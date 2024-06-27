import React, { useState, useEffect } from 'react';

import FullScreenImages from './FullScreenImages';

const FullScreenIcon = ({ listingPhotos }) => {
  const [fullScreen, setFullScreen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = fullScreen ? "hidden" : "auto";
  }, [fullScreen]);

  if (fullScreen) {
    return <FullScreenImages listingPhotos={listingPhotos} setFullScreen={setFullScreen} />
  }

  return (
    <div className="listing-interactive-icon-container listing-full-screen-icon-container" onClick={() => setFullScreen(true)}>
      <i className="fa-solid fa-expand full-screen-icon" />
    </div>
  )
}

export default FullScreenIcon;
