import React, { useContext, useState } from "react";
import Image from "next/image";
import Head from "next/head";
import CartContext from "@/store/cart-context";
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
      <div className="mt-[5rem] flex justify-center items-center w-full">
        <div className="w-1/2 flex items-center justify-center">
          <Image
            src={data.image}
            className="w-1/2"
            alt="image"
            height={500}
            width={500}
          />
        </div>
        <div className="w-1/2 space-y-2">
          <div className="text-4xl font-bold">{data.title}</div>
          <h3 className="font-bold text-2xl">
            Category: {" " + data.category}
          </h3>
          <p className=" italic ">{data.description}</p>
          <p className="font-bold">price: {" " + data.price}</p>
          <p className="font-bold">Rating: {" " + data.rating.rate}</p>
          <div className="flex items-center space-x-2">
            <button
              onClick={onAddToCartHandler}
              className="px-2 py-1 bg-gray-900 text-white rounded-md"
            >
              Add to Cart
            </button>
            <button className="px-2 py-1 bg-gray-900 text-white rounded-md">
              Buy now
            </button>
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
