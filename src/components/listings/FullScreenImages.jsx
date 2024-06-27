import React, { useState, useEffect } from 'react';

import ImageControlSlider from './ImageControlSlider';

const FullScreenImages = ({ listingPhotos, setFullScreen }) => {
  const [modalStyle, setModalStyle] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setModalStyle({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [])

  return (
    <div className="full-screen-modal" style={modalStyle}>
      <i className="fa-solid fa-xmark full-screen-modal-x" onClick={() => setFullScreen(false)} />
      <ImageControlSlider 
        isDetailedListing
        isModal
        listingPhotos={listingPhotos}
      />
    </div>
  )
}

export default FullScreenImages;
