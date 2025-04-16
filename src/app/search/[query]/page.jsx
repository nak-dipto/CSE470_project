"use client";

import { useEffect, useState, use } from "react";
import Products from "@/components/main-shop";
import { Loader2 } from "lucide-react";
const Page = ({ params }) => {
  const { query } = use(params);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProducts = async () => {
    try {
      const response = await fetch(`/api/search/${query}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setProducts(data.products || []);

      const uniqueCategories = [
        ...new Set(data.products.map((product) => product.category)),
      ].sort();

      uniqueCategories.unshift("All");
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, [query]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <>
      <p className="mt-5 ml-5 text-2xl">Search Results for "{query}"</p>
      {products.length === 0 ? (
        <div className="flex flex-wrap justify-center mt-10 text-lg">
          No Products Found
        </div>
      ) : (
        <Products categories={categories} products={products} />
      )}
    </>
  );
};

export default Page;
