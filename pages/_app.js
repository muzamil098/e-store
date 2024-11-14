import "@/styles/globals.css";
import Navbar from "./Global Components/Navbar";
import { CartContextProvider } from "@/store/cart-context";
import { useState } from "react";
import Footer from "./Global Components/Footer";
export default function App({ Component, pageProps }) {
  return (
    <>
      <CartContextProvider>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </CartContextProvider>
    </>
  );
}
