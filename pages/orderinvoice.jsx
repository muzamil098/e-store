import React from "react";
import { useRouter } from "next/router";

const OrderInvoice = () => {
  const router = useRouter();
  const { orderId, name, email, contact, address, items, total } = router.query;

  let parsedItems = [];
  try {
    parsedItems = items ? JSON.parse(items) : [];
  } catch {
    parsedItems = [];
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-blue-100 px-2 py-8 pt-28 md:pt-32">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full border border-blue-200 animate-fade-in">
        <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">
          Order Invoice
        </h2>
        <div className="mb-2 text-center">
          <span className="font-semibold text-gray-700">Order ID:</span>{" "}
          <span className="text-blue-600 font-mono">{orderId}</span>
        </div>
        <div className="mb-2 text-center">
          <span className="font-semibold text-gray-700">Name:</span> {name}
        </div>
        <div className="mb-2 text-center">
          <span className="font-semibold text-gray-700">Email:</span> {email}
        </div>
        <div className="mb-2 text-center">
          <span className="font-semibold text-gray-700">Contact:</span>{" "}
          {contact}
        </div>
        <div className="mb-2 text-center">
          <span className="font-semibold text-gray-700">Address:</span>{" "}
          {address}
        </div>
        <div className="border-t pt-4 mt-4">
          <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
          <ul className="divide-y divide-gray-200">
            {parsedItems.map((item) => (
              <li key={item.id} className="py-2 flex justify-between">
                <span>
                  {item.title} x {item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between font-bold mt-4">
            <span>Total:</span>
            <span className="text-blue-700">${total}</span>
          </div>
        </div>
        <div className="text-center mt-6">
          <span className="text-green-600 font-semibold">
            Thank you for your order!
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderInvoice;
