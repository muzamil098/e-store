import localFont from "next/font/local";
import ProductCards from "./Homepage Components/ProductCards";
import CartContext from "@/store/cart-context";
import { useContext } from "react";
import Carousel from "./Homepage Components/Carousel";
import Deals from "./Homepage Components/Deals";
import AskNextAI from "./Homepage Components/AskNextAI";
import CarouselComponent from "./Global Components/CarouselComponent";

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
      <div className="py-[5rem] h-screen w-screen flex-col flex items-center justify-center">
        <h1 className="text-4xl font-bold">Check your internet connection!</h1>
      </div>
    );
  } else {
    return (
      <div className="bg">
        <Carousel />
        <div>
          <AskNextAI />
        </div>
        <div>
          <Deals data={data} />
        </div>
        <main
          className={`${geistSans.variable} ${geistMono.variable}  grid md:grid-cols-3 lg:grid-cols-5 lg:gap-10 md:gap-2 place-items-center lg:px-[8rem] px-4 pt-1`}
        >
          {data.map((d) => (
            <li className="list-none w-full" key={d.id}>
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
        <hr className="my-10 w-[80%] mx-auto " />
        <Deals data={data} />{" "}
      </div>
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
