"use client";
import { useEffect, useState } from "react";
import Products from "@/components/main-shop";
import { Loader2 } from "lucide-react";
const Page = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const getProducts = async () => {
    try {
      const response = await fetch("/api/shop");
      const response1 = await fetch("/api/cart");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      if (!response1.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const data1 = await response1.json();
      setProducts(data.products || []);
      setBookmarks(data.bookmarks || []);
      setCart(data1.cart || []);
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

  return (
    <Products
      categories={categories}
      products={products}
      bookmarks={bookmarks}
      cart={cart}
    />
  );
};

export default Page;
