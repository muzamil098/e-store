import "@/styles/globals.css";
import Navbar from "./Global Components/Navbar";
import { CartContextProvider } from "@/store/cart-context";
import Footer from "./Global Components/Footer";
import Modal from "./Homepage Components/Modal";
import CartContext from "@/store/cart-context";
import { useContext } from "react";

function AppContent({ Component, pageProps }) {
  const cartCtx = useContext(CartContext);
  return (
    <>
      <Navbar />
      {cartCtx.cartState && <Modal />}
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default function App({ Component, pageProps }) {
  return (
    <CartContextProvider>
      <AppContent Component={Component} pageProps={pageProps} />
    </CartContextProvider>
  );
}
