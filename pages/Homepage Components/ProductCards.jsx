import React, { useState } from "react";
import Image from "next/image";
import { useContext } from "react";
import Link from "next/link";
import CartContext from "@/store/cart-context";
let cartValue = null;

function ProductCards({ image, price, category, title, rating, id }) {
  const [quantity, setQuantity] = useState(0);
  const cartCtx = useContext(CartContext);
  const onAddToCartHandler = () => {
    setQuantity(() => quantity + 1);
    cartCtx.cartValue;
    cartCtx.onAddToCart(title, price, id, image);
  };
  return (
    <div className="border w-[11rem] h-[15rem] md:w-[15rem] md:h-[15rem] px-4 space-y-4 py-2 shadow-md flex flex-col rounded justify-between ">
      <div className="w-full h-[10rem] flex justify-center items-center  overflow-hidden mx-auto mt-2">
        {" "}
        <Image
          src={image}
          alt="image"
          className="w-[3rem] md:w-[5rem] "
          height={400}
          width={400}
        />{" "}
      </div>
      <div>
        <Link href={`${id}`} className="font-bold text-[0.8rem]">
          {title && title.split(" ").slice(0, 3).join(" ")}
        </Link>
        <div className="flex justify-between font-bold items-center w-full">
          <p>${price}</p>
          <p>{rating && rating.rate}</p>
        </div>
      </div>
      <button
        className="w-full py-2 rounded-md bg-gray-900 text-white font-bold"
        onClick={onAddToCartHandler}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCards;
