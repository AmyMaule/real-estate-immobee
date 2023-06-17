import React from 'react';

const ImageControlBar = ({ currentImage, listingPhotos, maxImages, setCurrentImage }) => {
  const handleChangePhoto = direction => {
    if (direction === "R") {
      if (currentImage === listingPhotos.length - 1) {
        setCurrentImage(0);
      } else setCurrentImage(prev => prev + 1);
    } else if (direction === "L") {
      if (currentImage === 0) {
        setCurrentImage(listingPhotos.length - 1);
      } else setCurrentImage(prev => prev - 1);
    }
  }

  return (
    <div className="listing-image-control-bar">
      <div className="img-arrow img-arrow-left" onClick={() => handleChangePhoto("L")}>
        <span className="img-arrow-glyph">&#x27a4;</span>
      </div>
      {listingPhotos.map((photo, i) => {
        if ((window.innerWidth < 410 && i > 9) || i > maxImages) return null;
        return i === currentImage
          ? <img src="/bee-image-2.png" key={i} className="listing-image-current" />
          : <div className="listing-image-circle" key={i} onClick={() => setCurrentImage(i)} />
        })}
      <div className="img-arrow img-arrow-right" onClick={() => handleChangePhoto("R")}>
        <span className="img-arrow-glyph">&#x27A4;</span>
      </div>
    </div>
  )
}

export default ImageControlBar;
