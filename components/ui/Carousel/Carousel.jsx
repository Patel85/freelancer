import React, { useState, Children } from "react";
import { CarouselProvider, Slider, Slide, DotGroup } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

function Carousel({ children, className }) {
  let [isPlaying, setPlaying] = useState(true);
  return (
    <CarouselProvider
      className={`h-full w-full ${className}`}
      totalSlides={children.length || 1}
      isIntrinsicHeight
      isPlaying={isPlaying}
      infinite
      interval={3000}
      dragEnabled={false}
    >
      <Slider
        className="h-full w-full"
        classNameTray="h-full"
        classNameTrayWrap="h-full"
        onMouseEnter={() => setPlaying(false)}
        onMouseLeave={() => setPlaying(true)}
      >
        {Children.map(children, (child, index) => {
          return (
            <Slide
              index={index}
              innerClassName="flex justify-center items-center"
            >
              {child}
            </Slide>
          );
        })}
      </Slider>
      <DotGroup className="flex justify-center items-center mt-4" />
    </CarouselProvider>
  );
}

export default Carousel;
