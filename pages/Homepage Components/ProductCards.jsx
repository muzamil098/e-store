import * as React from "react";
import { useState } from "react";
import Image from "next/image";
import { useContext } from "react";
import Link from "next/link";
import CartContext from "@/store/cart-context";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CiHeart } from "react-icons/ci";

function ProductCards({ image, price, title, rating, id }) {
  const [quantity, setQuantity] = useState(0);
  const cartCtx = useContext(CartContext);

  // Get actual quantity from cart context
  const cartItem = cartCtx.productsAdded?.find((item) => item.id === id);
  const actualQuantity = cartItem ? cartItem.quantity : 0;

  const onAddToCartHandler = () => {
    setQuantity(() => quantity + 1);
    cartCtx.onAddToCart(title, price, id, image);
  };

  const onRemoveFromCartHandler = () => {
    if (actualQuantity > 0) {
      setQuantity(() => Math.max(0, quantity - 1));
      cartCtx.onRemoveFromCart(id);
    }
  };
  return (
    <Card
      sx={{
        marginTop: { xs: 3, sm: 4, md: 6 },
        borderRadius: "12px",
        transition: "all 0.2s ease",
        boxShadow: "none",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "none",
        },
      }}
      className={`w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-sm 
                  min-w-0 p-3 sm:p-4 md:p-4 
                  border border-gray-200 relative 
                  mx-auto`}
      elevation={0}
    >
      {/* Favorite button at top right */}
      <Button
        size="small"
        className="absolute top-1 right-1 sm:top-2 sm:right-2 
                   min-w-[32px] sm:min-w-[36px] h-8 sm:h-9 
                   p-1 text-gray-400 hover:text-red-500 hover:bg-white 
                   rounded-full transition-all duration-200 
                   z-10 bg-white/80 backdrop-blur-sm"
      >
        <CiHeart className="text-lg sm:text-xl" />
      </Button>

      <CardMedia
        sx={{
          height: { xs: 140, sm: 160, md: 180 },
          backgroundSize: "contain",
          backgroundPosition: "center",
        }}
        image={image}
        title={title}
        className="mb-2 sm:mb-3"
      />

      <CardContent className="pb-1 sm:pb-2 px-1 sm:px-2">
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          className="mb-1 sm:mb-2 min-h-[2.5rem] sm:min-h-[3rem]"
        >
          <Link
            href={`${id}`}
            className="font-medium text-xs sm:text-sm md:text-sm 
                      text-gray-800 hover:text-blue-600 transition-colors 
                      line-clamp-2 leading-tight"
          >
            {title}
          </Link>
        </Typography>

        <div className="flex justify-between items-center mb-2 sm:mb-3 flex-wrap gap-1">
          <Typography
            variant="h6"
            className="font-bold text-base sm:text-lg md:text-lg text-gray-900"
          >
            ${price}
          </Typography>

          <div className="flex items-center space-x-1 sm:space-x-2 flex-wrap">
            {rating && (
              <div className="flex items-center space-x-1">
                <span className="text-yellow-400 text-xs sm:text-sm">★</span>
                <Typography className="text-xs sm:text-sm text-gray-600">
                  {rating.rate}
                </Typography>
              </div>
            )}

            {actualQuantity > 0 && (
              <div
                className="bg-blue-100 text-blue-800 px-1.5 sm:px-2 py-0.5 sm:py-1 
                            rounded-full text-[10px] sm:text-xs font-medium whitespace-nowrap"
              >
                In Cart: {actualQuantity}
              </div>
            )}
          </div>
        </div>
      </CardContent>

      <CardActions className="flex justify-center items-center px-1 sm:px-2 pb-1 sm:pb-2 gap-1 sm:gap-2">
        <div className="flex gap-1 sm:gap-2 flex-1 w-full">
          <Button
            size="small"
            variant="contained"
            className="bg-blue-600 hover:bg-blue-700 
                      px-2 sm:px-3 py-2 sm:py-2 
                      text-white font-medium 
                      text-xs sm:text-xs md:text-xs 
                      rounded-lg normal-case flex-1 min-w-0"
            onClick={onAddToCartHandler}
          >
            <span className="hidden sm:inline">Add to Cart</span>
            <span className="sm:hidden">Add</span>
          </Button>

          <Button
            size="small"
            variant="outlined"
            className="border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 
                      px-2 sm:px-3 py-2 sm:py-2 
                      font-medium text-xs sm:text-xs md:text-xs 
                      rounded-lg normal-case min-w-[50px] sm:min-w-0 flex-shrink-0"
            onClick={() => cartCtx.onRemoveFromCart(id)}
            // disabled={actualQuantity === 0}
            // style={{
            //   opacity: actualQuantity === 0 ? 0.5 : 1,
            //   cursor: actualQuantity === 0 ? "not-allowed" : "pointer",
            // }}
          >
            <span className="hidden sm:inline">Remove</span>
            <span className="sm:hidden">Remove</span>
          </Button>
        </div>
      </CardActions>
    </Card>
  );
}

export default ProductCards;
