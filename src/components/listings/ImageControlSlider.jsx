import React, { useState, useEffect, useCallback, useRef } from "react";
import debounce from 'lodash.debounce';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageControlSlider = ({ isDetailedListing, isModal, listingPhotos }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 910);
  const [arrowPosition, setArrowPosition] = useState(0);
  const sliderRef = useRef();

  // Set initial padding when the controlBarRef is attached to a DOM node
  const listingImgRef = useCallback(node => {
    // Recursively check img height until the image has loaded
    const checkImgHeight = () => {
      if (node.clientHeight) {
        // If image hasn't loaded, clientHeight will be 24px high
        if (node.clientHeight === 24) {
          // set the arrows to be halfway between navbar and bottom of screen
          setArrowPosition((window.innerHeight - 64) / 2);
        } else {
          setArrowPosition(node.clientHeight / 2);
        }
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

  const handleArrowKeyDown = e => {
    if (e.key === "ArrowLeft") {
      sliderRef.current.slickPrev();
    } else if (e.key === "ArrowRight") {
      sliderRef.current.slickNext();
    }
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 910);
    const debouncedHandleResize = debounce(handleResize, 200);

    window.addEventListener("resize", debouncedHandleResize);
    if (isDetailedListing) {
      window.addEventListener("keydown", handleArrowKeyDown);
    }
    
    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
      if (isDetailedListing) {
        window.removeEventListener("keydown", handleArrowKeyDown);
      }
    }
  }, []);

  const ImageControlArrow = props => {
    // className and onClick are set by react-slick
    const { className, onClick, prevArrow } = props;
    return (
      <img 
        className={`${className} image-control-arrow ${prevArrow ? "image-control-arrow-prev" : ""}`}
        onClick={onClick}
        src="/arrow.png"
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
    dots: !isModal,
    infinite: true,
    nextArrow: <ImageControlArrow />,
    prevArrow: <ImageControlArrow prevArrow />,
    slidesToScroll: 1,
    slidesToShow: 1
  };

  return (
    <Slider ref={sliderRef} {...settings}>
      {listingPhotos.map((photo, i) => {
        return (
          <img 
            alt="Listing image"
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
