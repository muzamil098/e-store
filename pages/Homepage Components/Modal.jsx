import React, { useState } from "react";
import { useContext } from "react";
import CartContext from "@/store/cart-context";
import Image from "next/image";
import CheckoutForm from "../cart/Components/CheckoutForm";
import styles from "../../styles/shared.module.css";
function Modal(props) {
  // const cartCtx = useContext(CartContext);
  // const onCloseCart = () => {
  //   cartCtx.cartStateHandler(false);
  // };
  const { onIsCheckout } = props;

  return (
    <div
      className={`fixed inset-0 h-full w-full text-white backdrop-blur-sm bg-white/30 z-[1000] flex justify-center items-center ${styles.checkoutModal}`}
    >
      <div className="bg-white text-black p-4 w-full max-w-2xl md:max-w-3xl lg:max-w-4xl rounded-md shadow-2xl z-[60] border mx-2 md:mx-0">
        <div className="w-full flex justify-end items-center">
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
