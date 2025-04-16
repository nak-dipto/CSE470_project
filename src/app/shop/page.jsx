"use client";
import { useEffect, useState } from "react";
import Products from "@/components/main-shop";
import { Loader2 } from "lucide-react";
const Page = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const getProducts = async () => {
    try {
      const response = await fetch("/api/shop");

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
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return <Products categories={categories} products={products} />;
};

export default Page;
