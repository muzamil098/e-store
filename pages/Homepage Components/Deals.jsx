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
import styles from "../../styles/carousel.module.css";
import { CiHeart } from "react-icons/ci";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <GrNext
      className={className}
      style={{ ...style, display: "block", color: "black" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <GrPrevious
      className={className}
      style={{
        ...style,
        display: "block",
        color: "black",
      }}
      onClick={onClick}
    />
  );
}

function Deals(props) {
  const { data } = props;
  const settings = {
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    cssEase: "linear",
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 4,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 4,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className={`slider-container px-8 md:px-20 my-4 `}>
      <Slider {...settings} className="space-x-5">
        {data &&
          data.map((item) => (
            <li key={item.id} className=" lg:w-full my-4 ">
              <Card className={`w-full p-4 ${styles.dealsCSS} `}>
                <CardMedia
                  sx={{ height: 150, scale: 0.9 }}
                  image={item.image}
                  title={item.title}
                  className={`mx-auto p-10 rounded-lg`}
                />
                <CardContent>
                  {/* <Typography gutterBottom variant="h5" component="div">
                    {item.title.split(" ").slice(0, 3).join(" ")}
                  </Typography> */}
                  {/* <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {item.description}
                </Typography> */}
                </CardContent>
                <CardActions className="flex justify-between items-center px-4">
                  <Button
                    size="small"
                    className="bg-gray-900 p-4 w-full text-white text-[0.6rem]"
                  >
                    Add to Cart
                  </Button>
                  <Button size="small" className="text-4xl">
                    <CiHeart className="text-gray-600" />
                  </Button>
                </CardActions>
              </Card>
            </li>
          ))}
      </Slider>
    </div>
  );
}

export default Deals;
