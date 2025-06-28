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
  // Calculate total price
  const total = cartCtx.productsAdded.reduce(
    (sum, p) => sum + p.price * (p.quantity || 1),
    0
  );
  return (
    <>
      {isCheckout && <Modal onIsCheckout={checkoutHandler} />}
      <section className="min-h-screen py-20 flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 px-2">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-6 md:p-10 flex flex-col gap-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 text-center">
            Your Cart
          </h1>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border-separate border-spacing-y-2">
              <thead>
                <tr className="bg-blue-50">
                  <th className="px-3 py-2 rounded-l-lg">Image</th>
                  <th className="px-3 py-2">Item Name</th>
                  <th className="px-3 py-2">Quantity</th>
                  <th className="px-3 py-2 rounded-r-lg">Price</th>
                </tr>
              </thead>
              <tbody>
                {cartCtx.productsAdded.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="text-center py-8 text-gray-400 text-lg"
                    >
                      Your cart is empty.
                    </td>
                  </tr>
                ) : (
                  cartCtx.productsAdded.map((p) => (
                    <tr
                      key={p.id}
                      className="bg-gray-50 hover:bg-blue-50 transition rounded-xl shadow-sm"
                    >
                      <td className="px-3 py-2 align-middle">
                        <div className="h-14 w-14 rounded-lg overflow-hidden border border-gray-200 bg-white flex items-center justify-center">
                          <Image
                            src={p.image}
                            height={56}
                            width={56}
                            alt={p.title}
                            className="object-contain w-full h-full"
                          />
                        </div>
                      </td>
                      <td className="px-3 py-2 align-middle max-w-[180px]">
                        <p className="truncate font-medium text-gray-900">
                          {p.title}
                        </p>
                      </td>
                      <td className="px-3 py-2 align-middle">
                        <div className="flex items-center gap-2">
                          <button className="bg-gray-200 hover:bg-blue-200 text-blue-700 rounded-full w-7 h-7 flex items-center justify-center font-bold text-lg transition">
                            -
                          </button>
                          <span className="font-semibold text-gray-800 min-w-[24px] text-center">
                            {p.quantity}
                          </span>
                          <button className="bg-gray-200 hover:bg-blue-200 text-blue-700 rounded-full w-7 h-7 flex items-center justify-center font-bold text-lg transition">
                            +
                          </button>
                        </div>
                      </td>
                      <td className="px-3 py-2 align-middle">
                        <span className="font-semibold text-blue-600">
                          ${(p.price * (p.quantity || 1)).toFixed(2)}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {/* Cart Summary & Checkout */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-6 border-t pt-6">
            <div className="text-lg md:text-xl font-bold text-gray-800">
              Total: <span className="text-blue-600">${total.toFixed(2)}</span>
            </div>
            <button
              className="w-full md:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow transition-all duration-150 text-lg"
              onClick={checkoutHandler}
              disabled={cartCtx.productsAdded.length === 0}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Cart;
