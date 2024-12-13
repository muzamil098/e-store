import React from "react";
import Slider from "react-slick";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FiChevronLeft } from "react-icons/fi";
import { BiChevronRight } from "react-icons/bi";
import styles from "../../styles/form.module.css";
export default function Deals() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };
  const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
    const {
      carouselState: { currentSlide },
    } = rest;
    return (
      <div
        className="carousel-button-group md: lg:-translate-y-14 px-2  gap-4 flex justify-between 
        items-center w-full text-black "
      >
        <button
          className="block p-3 rounded-full bg-slate-300"
          onClick={() => previous()}
        >
          {" "}
          <FiChevronLeft />
        </button>
        <button onClick={() => next()}>
          <span className="block p-3 bg-slate-300 rounded-full">
            <BiChevronRight />
          </span>
        </button>
      </div>
    );
  };
  return (
    <div
      style={{
        position: "relative",
      }}
      className={`${styles.carousel} w-full rounded-lg h-24 my-4 mx-auto`}
    >
      <Carousel
        className="rounded-lg"
        additionalTransfrom={0}
        arrows={false}
        customButtonGroup={<ButtonGroup />}
        autoPlaySpeed={3000}
        centerMode={false}
        containerClass="container"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={true}
        renderDotsOutside
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024,
            },
            items: 1,
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0,
            },
            items: 1,
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464,
            },
            items: 1,
          },
        }}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots
        sliderClass=""
        slidesToSlide={1}
        swipeable
      >
        <div className="flex items-center justify-around bg-gray-900 text-white w-[90%] mx-auto rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          <div>
            <h3 className="text-4xl font-bold">Deal</h3>
            <h4 className="text-3xl font-bold">Deal of your choice</h4>
          </div>
          <div>
            <h2 className="text-6xl font-bold">50% OFF</h2>
          </div>
        </div>
        <div className="flex items-center justify-around bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-[90%] mx-auto rounded-lg text-white">
          <div>
            <h3 className="text-4xl font-bold">Deal</h3>
            <h4 className="text-3xl">Deal of your choice</h4>
          </div>
          <div>
            <h2 className="text-6xl">50% OFF</h2>
          </div>
        </div>
        <div className="flex items-center justify-around bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-[90%] mx-auto rounded-lg text-white">
          <div>
            <h3 className="text-4xl font-bold">Deal</h3>
            <h4 className="text-3xl">Deal of your choice</h4>
          </div>
          <div>
            <h2 className="text-6xl">50% OFF</h2>
          </div>
        </div>
      </Carousel>
    </div>
  );
}
