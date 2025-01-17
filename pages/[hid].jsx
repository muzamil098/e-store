import React, { useContext, useState } from "react";
import Image from "next/image";
import Head from "next/head";
import CartContext from "@/store/cart-context";
import Deals from "./Homepage Components/Deals";
function ProductDetailPage(props) {
  const { data } = props;
  // const [quantity, setQuantity] = useState(0);
  const cartCtx = useContext(CartContext);
  const onAddToCartHandler = () => {
    // setQuantity(() => quantity + 1);
    cartCtx.cartValue;
    cartCtx.onAddToCart(data.title, data.price, data.id, data.image);
  };
  return (
    <>
      <Head>
        <title>Products Detail Page</title>
        <meta name="description" content="Buy anything u want on E-Store" />
      </Head>
      <div className="mt-[5rem] flex flex-col md:flex-row justify-center items-center w-full">
        <div className="lg:w-1/2 flex items-center justify-center">
          <Image
            src={data.image}
            className="w-1/2"
            alt="image"
            height={500}
            width={500}
          />
        </div>
        <div className="px-4 md:px-2 lg:px-4 lg:w-1/2 ">
          <div className="lg:w-1/2 space-y-6">
            <div className="text-4xl font-bold text-black">{data.title}</div>
            <h3 className="font-bold text-2xl text-black">
              Category: {" " + data.category}
            </h3>
            <p className=" italic ">{data.description}</p>
            <p className="font-bold text-black">price: {" " + data.price}</p>
            <p className="font-bold text-black">
              Rating: {" " + data.rating.rate}
            </p>
            <div className="flex items-center space-x-2">
              <button
                onClick={onAddToCartHandler}
                className="px-4 py-2 bg-gray-900 text-white rounded-md"
              >
                Add to Cart
              </button>
              <button className="px-4 py-2 bg-gray-900 text-white rounded-md">
                Buy now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetailPage;
export async function getStaticPaths() {
  const res = await fetch(`https://fakestoreapi.com/products`);
  const data = await res.json();
  const paths = data.map((post) => ({
    params: { hid: post.id.toString() },
  }));
  return {
    paths,
    fallback: "blocking",
  };
}
export async function getStaticProps(context) {
  const productId = context.params.hid;
  const res = await fetch(`https://fakestoreapi.com/products/${productId}`);
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}
