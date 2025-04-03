"use client";

import { useEffect, useState, use } from "react";
import ProductCard from "@/components/productCard";

const Products = ({ params }) => {
  const [products, setProducts] = useState([]);
  const { query } = use(params);
  const getProducts = async () => {
    try {
      const response = await fetch(`/api/search/${query}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data.products);
      setProducts(data.products);
      return data;
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <p className="mt-5 ml-5 text-2xl">Search Results for "{query}"</p>
      <div className="flex flex-wrap justify-center mt-10">
        {products.map((product) => {
          return <ProductCard key={product._id} product={product} />;
        })}
      </div>
    </>
  );
};

export default Products;
