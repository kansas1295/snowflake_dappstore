/**
 * Displays a slider
 * TODO: Slider - Hoverstate data pull in (Title, Link Category etc..)
 */

import React from "react";
import Slider from "react-slick";

import slidesJson from "../../common/config/slides.json";

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 5000,
  slidesToShow: 3,
  slidesToScroll: 1,
  adaptiveHeight: true,
  variableWidth: true,
  className: "slider",
  draggable: true,
  touchThreshold: 1000,
  pauseOnHover: true,
  pauseOnFocus: true,
  pauseOnDotsHover: false,
  cssEase: "linear",
};

function Carousel() {
  return (
    <Slider {...settings}>
      {slidesJson.map((slide) => (
        <div className="fadeit" key={slide.link}>
          <img
            src={require("../../common/img/" + slide.image).default}
            alt="SlideImage"
            className="slider__test-slide"
          />
        </div>
      ))}
    </Slider>
  );
}

export default Carousel;
