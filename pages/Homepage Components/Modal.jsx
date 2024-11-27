import React, { useState } from "react";
import { useContext } from "react";
import CartContext from "@/store/cart-context";
import Image from "next/image";
function Modal() {
  const cartCtx = useContext(CartContext);
  const onCloseCart = () => {
    cartCtx.cartStateHandler(false);
  };
  return (
    <div className="absolute top-0 left-0 h-full  w-full  text-white  backdrop-blur-sm bg-white/30 z-[1000] flex justify-center items-center">
      <div className="bg-white text-black p-4 w-[50rem] rounded-md shadow-lg z-[60]">
        <div className="w-full flex justify-end items-center">
          <h4
            className="text-xl font-bold text-red-600 cursor-pointer"
            onClick={onCloseCart}
          >
            Close
          </h4>
        </div>
        {cartCtx.productsAdded &&
          cartCtx.productsAdded.map((p) => (
            <li key={p.id} className="list-none w-full my-5">
              <div className="flex justify-between items-center">
                <div className="h-12 w-12 bg-black">
                  <Image
                    src={`${p.image}`}
                    alt="image"
                    height={50}
                    width={50}
                  />
                </div>
                <div className="w-1/2">{p.title}</div>
                <div>${p.price}</div>
                <div className="flex justify-center items-center">
                  <div className="px-3 bg-gray-900 text-white font-bold">+</div>
                  <div className="px-3">{p.quantity}</div>
                  <div className="px-3 bg-gray-900 text-white font-bold">-</div>
                </div>
              </div>
            </li>
          ))}
        <div className="w-full flex justify-end items-center">
          <button className="px-2 py-2 text-white rounded-md bg-gray-900">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
