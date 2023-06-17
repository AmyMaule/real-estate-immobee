import React from 'react';

const ImageControlBar = ({ currentImage, listingPhotos, setCurrentImage }) => {
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
        return i === currentImage
          ? <img src="/bee-image-2.png" key={i} className="listing-image-current" />
          : <div className="listing-image-cirlce-container" key={i}>
              <div className="listing-image-circle" onClick={() => setCurrentImage(i)} />
            </div>
        })}
      <div className="img-arrow img-arrow-right" onClick={() => handleChangePhoto("R")}>
        <span className="img-arrow-glyph">&#x27A4;</span>
      </div>
    </div>
  )
}

export default ImageControlBar;
