import React, { useState } from "react";
import { useRef } from "react";
function TrackOrderDetails() {
  const [orderData, setOrderData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const trackingNumberInputRef = useRef();

  const orderTrackHandler = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    setOrderData(undefined);
    const tNumber = trackingNumberInputRef.current.value.trim();
    if (!tNumber) {
      setError("Please enter a valid Order ID.");
      setLoading(false);
      return;
    }
    try {
      // const response = await fetch(`/api/track-order`, {
      //   method: "POST",
      //   body: JSON.stringify({ tNumber }),
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });
      const response = await fetch(
        `https://e-store-3b990-default-rtdb.firebaseio.com/orders/${tNumber}.json`
      );
      const data = await response.json();
      console.log(data);
      if (!response.ok || !data?.placeOrder?.values) {
        setError(data?.message || "Order not found.");
        setOrderData(undefined);
      } else {
        setOrderData(data);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-blue-100 px-2 py-20">
      <div className="w-full max-w-md bg-white/90 rounded-2xl shadow-xl p-8 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-6 text-blue-900 tracking-tight">
          Track Your Order
        </h1>
        <form
          className="w-full"
          onSubmit={orderTrackHandler}
          autoComplete="off"
        >
          <div className="flex gap-2 mb-2">
            <input
              ref={trackingNumberInputRef}
              type="text"
              placeholder="Enter Order ID"
              className="flex-1 rounded-lg border border-blue-200 px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white shadow-sm transition-all"
              disabled={loading}
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg shadow transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-1">
                  <svg
                    className="animate-spin h-4 w-4 mr-1 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    ></path>
                  </svg>
                  Tracking...
                </span>
              ) : (
                "Track"
              )}
            </button>
          </div>
        </form>
        {error && (
          <div className="w-full text-red-600 text-sm mt-2 text-center">
            {error}
          </div>
        )}
        {!orderData && !error && !loading && (
          <div className="w-full text-gray-500 text-center mt-4">
            Enter your Order ID to see details.
          </div>
        )}
        {orderData && (
          <div className="w-full mt-6">
            <div className="bg-gradient-to-tr from-blue-100 to-blue-50 rounded-xl shadow p-5 flex flex-col gap-3">
              <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                <div className="flex-1">
                  <div className="mb-2">
                    <span className="font-semibold text-blue-900">Name:</span>{" "}
                    {orderData.placeOrder.values.name}
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold text-blue-900">
                      Last Name:
                    </span>{" "}
                    {orderData.placeOrder.values.lastName}
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold text-blue-900">Email:</span>{" "}
                    {orderData.placeOrder.values.email}
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold text-blue-900">
                      Address:
                    </span>{" "}
                    {orderData.placeOrder.values.address}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="mb-2">
                    <span className="font-semibold text-blue-900">
                      Contact:
                    </span>{" "}
                    {orderData.placeOrder.values.contact}
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold text-blue-900">
                      Order ID:
                    </span>{" "}
                    {orderData.placeOrder.values.orderId || "-"}
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold text-blue-900">Status:</span>{" "}
                    <span className="inline-block px-2 py-1 rounded bg-blue-200 text-blue-900 font-semibold text-xs">
                      {orderData.placeOrder.values.status || "Processing"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-2 border-t pt-3 text-xs text-gray-500 text-right">
                Last updated:{" "}
                {orderData.placeOrder.values.updatedAt
                  ? new Date(
                      orderData.placeOrder.values.updatedAt
                    ).toLocaleString()
                  : "-"}
              </div>
              {/* Order Details Section */}
              <div className="mt-4 border-t pt-4">
                <h3 className="text-lg font-semibold mb-2 text-blue-900">
                  Order Items
                </h3>
                <ul className="divide-y divide-gray-200">
                  {orderData.placeOrder.orderDetails &&
                  orderData.placeOrder.orderDetails.length > 0 ? (
                    orderData.placeOrder.orderDetails.map((item) => (
                      <li
                        key={item.id}
                        className="py-3 flex items-center gap-4 bg-white/80 rounded-lg shadow-sm mb-2 px-3 border border-blue-100 hover:shadow-md transition-all"
                      >
                        {/* Product image if available */}
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-12 h-12 object-contain rounded border border-gray-200 bg-gray-50"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-blue-900 truncate">
                            {item.title}
                          </div>
                          <div className="text-xs text-gray-500">
                            Qty: {item.quantity}
                          </div>
                        </div>
                        <div className="flex flex-col items-end min-w-[80px]">
                          <span className="text-blue-700 font-bold text-base">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                          <span className="text-xs text-gray-400">
                            @ ${item.price.toFixed(2)} each
                          </span>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="py-2 text-gray-500">No items found.</li>
                  )}
                </ul>
                <div className="flex justify-end font-bold mt-4">
                  <span className="text-blue-700">
                    Total: $
                    {orderData.placeOrder.orderDetails
                      ? orderData.placeOrder.orderDetails
                          .reduce((sum, p) => sum + p.price * p.quantity, 0)
                          .toFixed(2)
                      : "0.00"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TrackOrderDetails;
