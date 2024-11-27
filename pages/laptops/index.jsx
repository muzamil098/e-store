import React from "react";

function Laptops({ data }) {
  console.log(data);
  return <section className="py-[5rem]">Laptops</section>;
}

export default Laptops;
export async function getStaticProps() {
  const response = await fetch(
    "https://fakestoreapi.com/products/category/electronics"
  );
  const data = await response.json();
  return {
    props: {
      data: data,
    },
  };
}
