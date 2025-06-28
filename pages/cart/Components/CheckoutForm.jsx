import React, { useContext, useState, useRef } from "react";
import { useRouter } from "next/router";
import styles from "../../../styles/form.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import emailjs from "@emailjs/browser";
import CartContext from "@/store/cart-context";
function CheckoutForm() {
  const router = useRouter();
  const cartCtx = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);
  const [resStatus, setResStatus] = useState("");
  const [orderId, setOrderId] = useState("");
  const form = useRef();

  const submitHandler = async (values) => {
    try {
      setIsLoading(true);
      setResStatus("");

      const response = await fetch(
        "https://e-store-3b990-default-rtdb.firebaseio.com/orders.json",
        {
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
        }
      );
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
        setIsLoading(false);

        // Optionally, send email as before
        const templateParams = {
          subject: "Order Placement Verification",
          name: values.name,
          message: `Your order has been placed Successfully with Id ${data.name} with cash on delivery`,
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

        // Redirect to invoice page after successful order
        if (response.status === 200 || response.status === 201) {
          const query = new URLSearchParams({
            orderId: data.name,
            name: values.name,
            email: values.email,
            contact: values.contact,
            address: values.address,
            items: JSON.stringify(cartCtx.productsAdded),
            total: cartCtx.productsAdded
              .reduce((sum, p) => sum + p.price * p.quantity, 0)
              .toFixed(2),
          }).toString();
          router.push(`/orderinvoice?${query}`);
        }

        // Clear the cart after successful order placement
        cartCtx.productsAdded.forEach((product) => {
          cartCtx.onRemoveFromCart(product.id);
        });
        // Reset the cart using the context method
        cartCtx.resetCart();
      }
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
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      lastName: Yup.string().required("Last name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      contact: Yup.string()
        .matches(/^\d{10,15}$/, "Contact must be 10-15 digits")
        .required("Contact is required"),
      address: Yup.string()
        .min(5, "Address is too short")
        .required("Address is required"),
    }),
    onSubmit: submitHandler,
  });
  return (
    <div>
      <form
        ref={form}
        action=""
        className={`checkout-form ${styles.checkout_form} bg-gradient-to-br from-gray-50 to-blue-100 p-6 rounded-lg shadow-lg`}
        onSubmit={formik.handleSubmit}
      >
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="py-2 px-2 my-2 w-full">
            <label
              className="block font-semibold mb-1 text-blue-900"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              name="name"
              className={`px-3 py-2 w-full rounded border focus:ring-2 focus:ring-blue-500 bg-white shadow-sm transition-all ${
                formik.touched.name && formik.errors.name
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-500 text-xs mt-1 font-medium">
                {formik.errors.name}
              </div>
            )}
          </div>
          <div className="py-2 px-2 my-2 w-full">
            <label className="block font-semibold mb-1" htmlFor="lastName">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Enter Last Name"
              name="lastName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
              className={`px-3 py-2 w-full rounded border focus:ring-2 focus:ring-blue-400 ${
                formik.touched.lastName && formik.errors.lastName
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.lastName}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="py-2 px-2 my-2 w-full">
            <label className="block font-semibold mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              name="email"
              className={`px-3 py-2 w-full rounded border focus:ring-2 focus:ring-blue-400 ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.email}
              </div>
            )}
          </div>
          <div className="py-2 px-2 my-2 w-full">
            <label className="block font-semibold mb-1" htmlFor="contact">
              Contact
            </label>
            <input
              type="text"
              placeholder="Enter Contact"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.contact}
              name="contact"
              className={`px-3 py-2 w-full rounded border focus:ring-2 focus:ring-blue-400 ${
                formik.touched.contact && formik.errors.contact
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {formik.touched.contact && formik.errors.contact && (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.contact}
              </div>
            )}
          </div>
        </div>
        <div className="w-full py-2 px-2 my-2">
          <label className="block font-semibold mb-1" htmlFor="address">
            Address
          </label>
          <input
            type="text"
            placeholder="Enter Address"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address}
            name="address"
            className={`px-3 py-2 w-full rounded border focus:ring-2 focus:ring-blue-400 ${
              formik.touched.address && formik.errors.address
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          {formik.touched.address && formik.errors.address && (
            <div className="text-red-500 text-xs mt-1">
              {formik.errors.address}
            </div>
          )}
        </div>
        <div className="w-full flex justify-end items-center mt-2">
          <button
            className="px-4 py-2 text-white rounded-md bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 flex items-center justify-center space-x-2 font-semibold shadow-lg transition-all disabled:opacity-60"
            disabled={isLoading}
          >
            <span>Place Order</span>
            {isLoading && (
              <span className="ml-2 animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CheckoutForm;
