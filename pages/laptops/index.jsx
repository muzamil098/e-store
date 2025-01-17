import React from "react";
import ProductCards from "../Homepage Components/ProductCards";
import Deals from "../Homepage Components/Deals";
function Laptops({ data }) {
  return (
    <>
      {" "}
      <section className="mt-[5rem] grid md:grid-cols-3 lg:grid-cols-4 lg:gap-4 md:gap-2 place-items-center lg:px-[10rem] md:px-4 pt-1">
        {data.map((d) => (
          <li className="w-full list-none" key={d.id}>
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
      <Deals data={data} />
    </>
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
