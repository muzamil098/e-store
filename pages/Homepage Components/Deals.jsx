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
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
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
    <div className={`slider-container px-12 md:px-20 my-4 space-x-10 `}>
      <Slider {...settings}>
        {data &&
          data.map((item) => (
            <li key={item.id} className="w-full">
              <Card
                sx={{ maxWidth: 350, minWidth: 100, width: 400 }}
                className={`p-4 ${styles.dealsCSS}`}
              >
                <CardMedia
                  sx={{ height: 450, maxWidth: 400, scale: 0.9 }}
                  image={item.image}
                  title={item.title}
                  className={`mx-auto p-10 ${styles.dealsCSS}`}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.title.split(" ").slice(0, 3).join(" ")}
                  </Typography>
                  {/* <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {item.description}
                </Typography> */}
                </CardContent>
                <CardActions>
                  <Button size="medium">Share</Button>
                  <Button size="medium">Learn More</Button>
                </CardActions>
              </Card>
            </li>
          ))}
      </Slider>
    </div>
  );
}

export default Deals;
