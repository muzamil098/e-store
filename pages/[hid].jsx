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
      <div className="mt-[5rem] flex justify-center items-center w-full min-h-[80vh] bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-2">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden">
          {/* Image Section */}
          <div className="md:w-1/2 flex items-center justify-center bg-white0 p-6">
            <div className="w-full max-w-xs aspect-square bg-white rounded-xl flex items-center justify-center overflow-hidden">
              <Image
                src={data.image}
                alt="image"
                height={400}
                width={400}
                className="object-contain w-full h-full"
                priority
              />
            </div>
          </div>
          {/* Info Section */}
          <div className="md:w-1/2 flex flex-col justify-center p-6 gap-6">
            <div className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-2">
              {data.title}
            </div>
            <div className="flex flex-wrap gap-2 items-center mb-2">
              <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                {data.category}
              </span>
              <span className="inline-block bg-yellow-100 text-yellow-700 text-xs font-semibold px-3 py-1 rounded-full">
                Rating: {data.rating.rate}
              </span>
            </div>
            <p className="text-gray-700 text-base mb-2">{data.description}</p>
            <div className="flex items-end gap-3 mb-4">
              <span className="text-2xl md:text-3xl font-bold text-blue-600">
                ${data.price}
              </span>
              <span className="text-sm text-gray-400 line-through">
                ${(data.price * 1.2).toFixed(2)}
              </span>
              <span className="text-xs text-green-600 font-semibold">
                20% OFF
              </span>
            </div>
            <div className="flex gap-4 mt-2">
              <button
                onClick={onAddToCartHandler}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow transition-all duration-150"
              >
                Add to Cart
              </button>
              <button className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold shadow transition-all duration-150">
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
