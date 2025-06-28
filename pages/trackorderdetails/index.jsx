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
      const response = await fetch(`/api/track-order`, {
        method: "POST",
        body: JSON.stringify({ tNumber }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok || !data?.message?.values) {
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
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-blue-100 px-2 py-8">
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
                    {orderData.message.values.name}
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold text-blue-900">
                      Last Name:
                    </span>{" "}
                    {orderData.message.values.lastName}
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold text-blue-900">Email:</span>{" "}
                    {orderData.message.values.email}
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold text-blue-900">
                      Address:
                    </span>{" "}
                    {orderData.message.values.address}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="mb-2">
                    <span className="font-semibold text-blue-900">
                      Contact:
                    </span>{" "}
                    {orderData.message.values.contact}
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold text-blue-900">
                      Order ID:
                    </span>{" "}
                    {orderData.message.values.orderId || "-"}
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold text-blue-900">Status:</span>{" "}
                    <span className="inline-block px-2 py-1 rounded bg-blue-200 text-blue-900 font-semibold text-xs">
                      {orderData.message.values.status || "Processing"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-2 border-t pt-3 text-xs text-gray-500 text-right">
                Last updated:{" "}
                {orderData.message.values.updatedAt
                  ? new Date(
                      orderData.message.values.updatedAt
                    ).toLocaleString()
                  : "-"}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TrackOrderDetails;
