import React, { useContext, useState, useRef } from "react";
import styles from "../../../styles/form.module.css";
import { useFormik } from "formik";
import emailjs from "@emailjs/browser";
import CartContext from "@/store/cart-context";
function CheckoutForm() {
  const cartCtx = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);
  const [resStatus, setResStatus] = useState("");
  const [orderId, setOrderId] = useState("");
  const form = useRef();

  const submitHandler = async (values) => {
    try {
      setIsLoading(true);
      setResStatus("");

      const response = await fetch("/api/placeorder", {
        method: "POST",
        body: JSON.stringify({
          placeOrder: {
            values,
            orderDetails: cartCtx.productsAdded,
          },
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        console.log("Error occured");
      }
      if (!response) {
        console.log("No response");
      }
      if (response) {
        const data = await response.json();
        setOrderId(data.insertedId);
        setResStatus(response.status);
        console.log(data);
        setIsLoading(false);
        const templateParams = {
          subject: "Order Placement Verification",
          name: values.name,
          message: `Your order has been placed Successfully with Id ${orderId} with cash on delivery`,
        };

        {
          data &&
            emailjs
              .send(
                "service_ol1b9ja",
                "template_glmg9mk",
                templateParams,
                "y0R8A6OO8QgyhWAos"
              )
              .then(
                () => {
                  console.log("SUCCESS!");
                },
                (error) => {
                  console.log("FAILED...", error.text);
                }
              );
        }
        values.name = "";
        values.lastName = "";
        values.email = "";
        values.contact = "";
        values.address = "";
      }
      // setResStatus(response.status);
    } catch (err) {
      console.log(err.message);
    }
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      lastName: "",
      email: "",
      contact: "",
      address: "",
    },
    onSubmit: submitHandler,
  });
  return (
    <div>
      <form
        ref={form}
        action=""
        className={`checkout-form ${styles.checkout_form}`}
        onSubmit={formik.handleSubmit}
      >
        {resStatus === 201 && (
          <h1 className="text-center bg-green-700 text-white font-bold text-xl">
            Order Placed With id {orderId}. Id has been sent to your email.
          </h1>
        )}
        <div className="flex justify-between items-center w-full">
          <div className="py-2 px-2 my-2 w-full">
            <p>Enter Name</p>
            <input
              type="text"
              placeholder="Enter Name"
              onChange={formik.handleChange}
              value={formik.values.name}
              // ref={nameInputRef}
              name="name"
              className="px-2 py-2 w-full"
            />
          </div>
          <div className="py-2 px-2 my-2 w-full">
            <p>Enter Last Name</p>
            <input
              type="text"
              placeholder="Enter Last Name"
              name="lastName"
              // ref={lastNameInputRef}
              value={formik.values.lastName}
              onChange={formik.handleChange}
              className="px-2 py-2 w-full"
            />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="w-full py-2 px-2 my-2">
            Enter Email
            <input
              type="text"
              placeholder="Enter Email"
              onChange={formik.handleChange}
              value={formik.values.email}
              name="email"
              className="px-2 py-2 w-full"
            />
          </div>
          <div className="w-full py-2 px-2 my-2">
            Enter Contact
            <input
              type="text"
              placeholder="Enter Contact"
              onChange={formik.handleChange}
              value={formik.values.contact}
              name="contact"
              className="px-2 py-2 w-full"
            />
          </div>
        </div>
        <div className="w-full py-2 px-2 my-2">
          Enter Address
          <input
            type="text"
            placeholder="Enter Address"
            onChange={formik.handleChange}
            value={formik.values.address}
            name="address"
            className="px-2 py-2 w-full"
          />
        </div>
        <div className="w-full flex justify-end items-center">
          <button
            className="px-2 py-2 text-white rounded-md bg-gray-900 flex items-center justify-center space-x-2"
            type="submit"
          >
            <p>Place Order</p>
            {isLoading && (
              <span className="loading loading-bars loading-xs"></span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CheckoutForm;
