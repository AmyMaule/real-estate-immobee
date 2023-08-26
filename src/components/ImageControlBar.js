import React, { useRef } from 'react';

const ImageControlBar = ({ currentImage, listingPhotos, setCurrentImage, setPadding }) => {
  const controlBarRef = useRef();

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

  const getPadding = () => {
    if (setPadding && controlBarRef.current) {
      const controlBarHeight = controlBarRef.current.clientHeight;
      return {
        paddingBottom: controlBarHeight / 2 + "px",
        transform: "translateY(9px)"
      }
    }
    return {};
  }

  return (
    <div className="listing-image-control-bar" ref={controlBarRef}>
      <div className="img-arrow img-arrow-left" onClick={() => handleChangePhoto("L")} style={getPadding()}>
        <span className="img-arrow-glyph">&#x27a4;</span>
      </div>
      {listingPhotos.map((photo, i) => {
        return i === currentImage
          ? <img src="/bee-4.png" key={i} className="listing-image-current" alt="" />
          : <div className="listing-image-circle-container" key={i}>
              <div className="listing-image-circle" onClick={() => setCurrentImage(i)} />
            </div>
        })}
      <div className="img-arrow img-arrow-right" onClick={() => handleChangePhoto("R")} style={getPadding()}>
        <span className="img-arrow-glyph">&#x27A4;</span>
      </div>
    </div>
  )
}

export default ImageControlBar;
