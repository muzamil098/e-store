import React from "react";
import Image from "next/image";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import styles from "../../styles/shared.module.css";

const images = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1465101178521-c1a9136a3b41?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1920&q=80",
];

function Carousel() {
  return (
    <div className="flex justify-center items-center mt-[5rem] w-[90vw] mx-auto">
      <div className="w-[90vw] h-[50vh] max-w-[90vw]">
        <Splide
          options={{
            type: "loop",
            perPage: 1,
            gap: "0rem",
            autoplay: true,
            interval: 3500,
            pauseOnHover: true,
            arrows: true,
            pagination: true,
          }}
          aria-label="Unsplash Image Carousel"
          style={{ height: "100%" }}
        >
          {images.map((src, idx) => (
            <SplideSlide key={idx}>
              <div className="w-full h-[50vh] flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl overflow-hidden">
                <Image
                  src={src}
                  alt={`Unsplash ${idx}`}
                  fill
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                    transition: "transform 0.2s",
                  }}
                  className="group-hover:scale-105"
                  sizes="90vw"
                />
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </div>
  );
}

export default Carousel;
