/**
 * Displays a slider
 * TODO: Slider - The images should be imported from the src folder not the public one
 * TODO: Slider - Hoverstate class
 * TODO: Slider - Hoverstate data pull in (Title, Link Category etc..)
 */

import React from 'react';
import Slider from 'react-slick';

import slidesJson from '../../common/config/slides.json';

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
  className: 'slider',
  draggable: true,
  touchThreshold: 1000,
  pauseOnHover: true,
  pauseOnFocus: true,
  pauseOnDotsHover: false,
  cssEase: 'linear',
};

function Carousel() {
  return (
    <Slider {...settings}>
      {slidesJson.map(slide => (
        <div
          className="fadeit"
          key={slide.link}
        >
          <div onClick={() =>{window.open(slide.link)}}
            className="slider__test-slide"
            style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/img/${slide.image})` }}
          />
        </div>
      ))}
    </Slider>
  );
}

export default Carousel;
