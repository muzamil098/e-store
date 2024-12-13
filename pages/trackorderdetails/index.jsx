import React, { useState } from "react";
import { useRef } from "react";
function TrackOrderDetails() {
  const [orderData, setOrderData] = useState();
  const trackingNumberInputRef = useRef();
  const orderTrackHandler = async (event) => {
    event.preventDefault();
    const tNumber = trackingNumberInputRef.current.value;
    const response = await fetch(`/api/track-order`, {
      method: "POST",
      body: JSON.stringify({ tNumber: tNumber }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setOrderData(data);
    console.log(orderData);
  };
  return (
    <div className="h-screen py-[5rem] w-screen flex flex-col items-center justify-center">
      <form action="" onSubmit={orderTrackHandler}>
        <div className="flex justify-center items-center">
          <input
            ref={trackingNumberInputRef}
            type="text"
            placeholder="Enter Order Id"
            className="bg-white text-black px-2 py-1 border w-[20rem]"
          />
          <button type="submit" className="bg-gray-900 px-2 py-1">
            Track
          </button>
        </div>
      </form>
      {!orderData && <p>no data</p>}
      {orderData && (
        <div>
          <div className="flex justify-between items-start my-2">
            <div className="w-1/2">
              <p>
                {" "}
                <span className="font-bold text-black">Name:</span>{" "}
                {orderData.message.values.name}{" "}
              </p>
              <p>
                {" "}
                <span className="font-bold text-black">Last Name:</span>{" "}
                {orderData.message.values.lastName}{" "}
              </p>
              <p>
                {" "}
                <span className="font-bold text-black">Email:</span>{" "}
                {orderData.message.values.email}{" "}
              </p>
              <p>
                {" "}
                <span className="font-bold text-black">Address:</span>{" "}
                {orderData.message.values.address}{" "}
              </p>
            </div>
            <div>
              <p>
                {" "}
                <span className="font-bold text-black">Email:</span>{" "}
                {orderData.message.values.email}{" "}
              </p>
              <p>
                {" "}
                <span className="font-bold text-black">Name:</span>{" "}
                {orderData.message.values.contact}{" "}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TrackOrderDetails;
