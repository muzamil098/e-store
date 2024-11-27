import "@/styles/globals.css";
import Navbar from "./Global Components/Navbar";
import { CartContextProvider } from "@/store/cart-context";
import Footer from "./Global Components/Footer";
import Modal from "./Homepage Components/Modal";
import CartContext from "@/store/cart-context";
import { useContext } from "react";
export default function App({ Component, pageProps }) {
  const cartCtx = useContext(CartContext);
  return (
    <>
      <CartContextProvider>
        <Navbar />
        {cartCtx.cartState && <Modal />}
        <Component {...pageProps} />
        <Footer />
      </CartContextProvider>
    </>
  );
}
