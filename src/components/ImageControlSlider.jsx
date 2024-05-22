import React, { useState, useEffect, useCallback } from "react";
import debounce from 'lodash.debounce';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageControlSlider = ({ isDetailedListing, listingPhotos }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 910);
  const [arrowPosition, setArrowPosition] = useState(0);

  // Set initial padding when the controlBarRef is attached to a DOM node
  const listingImgRef = useCallback(node => {
    // Recursively check img height until the image has loaded
    const checkImgHeight = () => {
      if (node.clientHeight) {
        setArrowPosition(node.clientHeight / 2);
      } else {
        setTimeout(checkImgHeight, 50);
      }
    };

    if (node !== null) {
      const slideNumber = Number(node.dataset.slide);
      if (slideNumber === activeSlide) {
        checkImgHeight();
      }
    }
  }, [activeSlide]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 910);
    const debouncedHandleResize = debounce(handleResize, 200);

    window.addEventListener("resize", debouncedHandleResize);
    return () => window.removeEventListener("resize", debouncedHandleResize);
  }, []);

  const ImageControlArrow = props => {
    // className and onClick are set by react-slick
    const { className, onClick, prevArrow } = props;
    return (
      <img 
        className={`${className} image-control-arrow ${prevArrow ? "image-control-arrow-prev" : ""}`}
        onClick={onClick}
        src="/arrow2.png"
        // ensure the arrows for detailed listings don't display until they can be positioned correctly
        style={{display: arrowPosition || !isDetailedListing ? "" : "none", top: isDetailedListing ? arrowPosition + "px" : "102px"}}
      />
    );
  }

  const settings = {
    // on larger screens, the height takes up 100vh, on mobile, it adapts to fit 100% image width
    adaptiveHeight: isDetailedListing && isMobile,
    beforeChange: (current, next) => setActiveSlide(next),
    customPaging: (i) => {
      return i === activeSlide
        ? <img src="/bee-4.png" key={i} className="listing-image-current" alt="" />
        : <div className="listing-image-circle-container" key={i}>
            <div className="listing-image-circle" />
          </div>        
    },
    dots: true,
    infinite: true,
    nextArrow: <ImageControlArrow />,
    prevArrow: <ImageControlArrow prevArrow />,
    slidesToScroll: 1,
    slidesToShow: 1
  };

  return (
    <Slider {...settings}>
      {listingPhotos.map((photo, i) => {
        return (
          <img 
            alt="listing image"
            className={`${isDetailedListing ? "listing-detail-image" : "listing-image"}`}
            data-slide={i}
            key={i}
            ref={listingImgRef}
            src={photo}
          />
        )
      })}
    </Slider>
  );
}

export default ImageControlSlider;
