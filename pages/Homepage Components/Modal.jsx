import React, { useState } from "react";
import { useContext } from "react";
import CartContext from "@/store/cart-context";
import Image from "next/image";
import CheckoutForm from "../cart/Components/CheckoutForm";
function Modal(props) {
  // const cartCtx = useContext(CartContext);
  // const onCloseCart = () => {
  //   cartCtx.cartStateHandler(false);
  // };
  const { onIsCheckout } = props;

  return (
    <div className="absolute top-0 left-0 h-full  w-full  text-white  backdrop-blur-sm bg-white/30 z-[1000] flex justify-center items-center">
      <div className="bg-white text-black p-4 w-[50rem] rounded-md shadow-2xl z-[60] border">
        <div className="w-full flex justify-end   items-center">
          <h4
            className="text-xl font-bold text-red-600 cursor-pointer"
            onClick={onIsCheckout}
          >
            Close
          </h4>
        </div>
        <CheckoutForm />
      </div>
    </div>
  );
}

export default Modal;
