import React from "react";
import ProductCards from "../Homepage Components/ProductCards";
function Laptops({ data }) {
  return (
    <section className="py-[5rem] flex items-center justify-between">
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
    </section>
  );
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
