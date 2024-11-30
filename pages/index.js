import Image from "next/image";
import localFont from "next/font/local";
import ProductCards from "./Homepage Components/ProductCards";
import Link from "next/link";
import Modal from "./Homepage Components/Modal";
import CartContext from "@/store/cart-context";
import { useContext } from "react";
import Carousel from "./Homepage Components/Carousel";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home(props) {
  const cartCtx = useContext(CartContext);
  const { data } = props;
  if (data === null) {
    return (
      <div className="py-[5rem] h-screen w-screen flex items-center justify-center">
        <h1 className="text-4xl font-bold">Check your internet connection!</h1>
      </div>
    );
  } else {
    return (
      <>
        <Carousel />
        <main
          className={`${geistSans.variable} ${geistMono.variable} grid grid-cols-2 md:grid-cols-12 gap-2 md:gap-4 place-items-center px-2 md:px-4 pt-1`}
        >
          {data.map((d) => (
            <li className=" md:col-span-4 lg:col-span-2 list-none" key={d.id}>
              {" "}
              <ProductCards
                id={d.id}
                image={d.image}
                title={d.title}
                price={d.price}
                rating={d.rating}
              />{" "}
            </li>
          ))}
        </main>
      </>
    );
  }
}

export async function getStaticProps() {
  let allProducts;
  try {
    const response = await fetch(`https://fakestoreapi.com/products`);
    const data = await response.json();
    allProducts = data;
  } catch (err) {
    console.log("Failed to fetch");
    allProducts = null;
  }
  return {
    props: {
      data: allProducts,
    },
  };
}
