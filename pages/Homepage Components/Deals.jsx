import * as React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CiHeart } from "react-icons/ci";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white hover:bg-gray-50 rounded-full p-2 shadow-md hover:shadow-lg cursor-pointer transition-all duration-200 border border-gray-200"
      onClick={onClick}
    >
      <GrNext className="text-gray-700 text-lg" />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white hover:bg-gray-50 rounded-full p-2 shadow-md hover:shadow-lg cursor-pointer transition-all duration-200 border border-gray-200"
      onClick={onClick}
    >
      <GrPrevious className="text-gray-700 text-lg" />
    </div>
  );
}

function Deals(props) {
  const { data } = props;
  const settings = {
    autoplay: true,
    speed: 800,
    autoplaySpeed: 4000,
    cssEase: "ease-in-out",
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    dots: true,
    dotsClass: "slick-dots custom-dots",
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
          arrows: true,
        },
      },
    ],
  };
  return (
    <div className="relative bg-white py-8 sm:py-12">
      <div className="text-center mb-8 sm:mb-12 px-4">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
          Hot Deals
        </h2>
        <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
          Save big on these limited time offers!
        </p>
      </div>
      <div className="slider-container px-2 sm:px-6 lg:px-16 relative overflow-x-visible">
        <Slider {...settings} className="deals-slider">
          {data &&
            data.map((item) => (
              <div key={item.id} className="px-1 sm:px-2">
                <Card
                  sx={{
                    borderRadius: "18px",
                    background: "#fff",
                    border: "1.5px solid #e5e7eb",
                    transition:
                      "box-shadow 0.2s, border-color 0.2s, transform 0.18s",
                    maxWidth: 270,
                    margin: "0 auto",
                    boxShadow: "none",
                    position: "relative",
                    overflow: "visible",
                    "&:hover": {
                      boxShadow: "0 6px 24px 0 rgba(30,41,59,0.10)",
                      borderColor: "#2563eb",
                    },
                  }}
                  className="w-full h-full flex flex-col relative group"
                  elevation={0}
                >
                  <Button
                    size="small"
                    className="absolute top-3 right-3 z-10 min-w-[36px] h-9 p-1.5 text-gray-400 hover:text-red-500 hover:bg-gray-100 rounded-full transition-all duration-200 bg-white/90 shadow-md"
                  >
                    <CiHeart className="text-xl" />
                  </Button>
                  <div className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full text-xs font-bold tracking-wide bg-gradient-to-r from-pink-400 via-red-400 to-yellow-400 text-white shadow-md border border-white/70">
                    DEAL
                  </div>
                  <CardMedia
                    sx={{
                      height: { xs: 130, sm: 160, md: 180 },
                      backgroundSize: "contain",
                      backgroundPosition: "center",
                      borderRadius: "14px 14px 0 0",
                      background:
                        "linear-gradient(135deg, #f3f4f6 60%, #e0e7ff 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 1.5,
                      overflow: "hidden",
                    }}
                    image={item.image}
                    title={item.title}
                    imgProps={{
                      style: {
                        objectFit: "contain",
                        maxHeight: "100%",
                        maxWidth: "100%",
                        width: "auto",
                        height: "auto",
                        margin: "0 auto",
                        display: "block",
                      },
                    }}
                  />
                  <CardContent className="p-4 flex-1 flex flex-col justify-between">
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      className="font-semibold text-gray-900 mb-2 line-clamp-2 text-base sm:text-lg leading-tight min-h-[2.4rem]"
                    >
                      {item.title}
                    </Typography>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-end space-x-2">
                        <Typography
                          variant="h5"
                          className="font-bold text-xl text-blue-600"
                        >
                          ${item.price}
                        </Typography>
                        {item.originalPrice && (
                          <Typography
                            variant="body2"
                            className="text-gray-400 line-through text-sm"
                          >
                            ${item.originalPrice}
                          </Typography>
                        )}
                      </div>
                      {item.rating && (
                        <div className="flex items-center space-x-1">
                          <span className="text-yellow-400 text-base">★</span>
                          <Typography className="text-xs text-gray-600 font-medium">
                            {item.rating.rate}
                          </Typography>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardActions className="px-4 pb-4">
                    <Button
                      size="large"
                      variant="contained"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg normal-case text-base shadow-sm"
                    >
                      Add to Cart
                    </Button>
                  </CardActions>
                </Card>
              </div>
            ))}
        </Slider>
      </div>
      <style jsx>{`
        .deals-slider .slick-dots {
          bottom: -32px;
        }
        .deals-slider .slick-dots li button:before {
          font-size: 12px;
          color: #cbd5e1;
          opacity: 1;
        }
        .deals-slider .slick-dots li.slick-active button:before {
          color: #2563eb;
        }
      `}</style>
    </div>
  );
}

export default Deals;
