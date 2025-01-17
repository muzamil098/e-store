import * as React from "react";
import { useState } from "react";
import Image from "next/image";
import { useContext } from "react";
import Link from "next/link";
import CartContext from "@/store/cart-context";
import styles from "../../styles/products.module.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CiHeart } from "react-icons/ci";

function ProductCards({ image, price, category, title, rating, id }) {
  const [quantity, setQuantity] = useState(0);
  const cartCtx = useContext(CartContext);
  const onAddToCartHandler = () => {
    setQuantity(() => quantity + 1);
    cartCtx.cartValue;
    cartCtx.onAddToCart(title, price, id, image);
  };
  return (
    <Card
      sx={{ marginTop: 6 }}
      className={`w-full md:max-w-[20rem] md:min-w-[15rem] lg:max-w-[25rem] p-4 lg:min-w-[11rem] ${styles.productCard}`}
    >
      <CardMedia
        sx={{ height: 140, maxWidth: 110 }}
        image={image}
        title="green iguana"
        className="mx-auto"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          <Link href={`${id}`} className="font-bold text-[0.8rem] text-black">
            {title && title.split(" ").slice(0, 3).join(" ")}
          </Link>
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "text.secondary" }}
          className="flex justify-between items-center font-bold
           w-full text-black"
        >
          <span className=""> {price}</span>
          <span>{rating && rating.rate}</span>
        </Typography>
      </CardContent>
      <CardActions className="flex justify-between items-center px-4">
        <Button
          size="small"
          className="bg-gray-900 p-4 w-full text-white font-semibold"
          onClick={onAddToCartHandler}
        >
          Add to Cart
        </Button>
        <Button size="small" className="text-4xl">
          <CiHeart className="text-gray-600" />
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductCards;
