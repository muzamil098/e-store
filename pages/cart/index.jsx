import CartContext from "@/store/cart-context";
import React, { useContext, useState } from "react";
import Image from "next/image";
import Modal from "../Homepage Components/Modal";
function Cart() {
  const cartCtx = useContext(CartContext);
  const [isCheckout, setIsCheckout] = useState(false);
  const checkoutHandler = () => {
    setIsCheckout(!isCheckout);
  };
  return (
    <>
      {isCheckout && <Modal onIsCheckout={checkoutHandler} />}
      <section className="py-[6rem] h-screen flex-col flex justify-center items-center md:px-4 px-2">
        <h1 className="text-4xl my-2 font-bold">Items added to cart</h1>
        <table className="w-[60%] text-left px-2">
          <thead>
            <tr className="py-3 border-b">
              <th className="px-2">Image</th>
              <th className="px-2">Item Name</th>
              <th className="px-2">Quantity</th>
              <th className="px-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {cartCtx.productsAdded.map((p) => (
              <tr key={p.id} className="list-none py-2 border-b">
                <td className="px-2">
                  <div className="h-12 w-12 overflow-hidden">
                    <Image
                      src={`${p.image}`}
                      height={200}
                      width={200}
                      alt="Image"
                    />
                  </div>
                </td>
                <td className="px-2">
                  <p className="w-1/2"> {p.title} </p>
                </td>
                <td className="px-2">{p.quantity}</td>
                <td className="px-2">
                  <div className="flex items-center justify-around space-x-2">
                    <button className="bg-transparent px-2 py-1 text-gray-900 font-bold">
                      -
                    </button>
                    <p>{p.price}</p>
                    <button className="bg-transparent px-2 py-1 text-gray-900 font-bold">
                      +
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            <tr>
              <td></td>
              <td></td>
              <td className="py-2" colSpan={2}>
                {" "}
                <button
                  className="bg-gray-900 px-2 py-2 rounded-md text-white w-full"
                  onClick={checkoutHandler}
                >
                  Proceed to Checkout
                </button>{" "}
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </>
  );
}

export default Cart;
