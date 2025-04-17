"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Products from "@/components/main-shop";
import { Loader2 } from "lucide-react";
const Page = () => {
  const { data: session } = useSession();
  let user = session?.user.email;
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const getProducts = async () => {
    try {
      const response = await fetch("/api/shop");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const userBookmarks =
        data.bookmarks?.filter((item) => item.user === user) || [];
      setBookmarks(userBookmarks);
      console.log(userBookmarks);

      const matchedProducts =
        data.products?.filter((product) =>
          userBookmarks.some((bookmark) => bookmark.productId === product._id)
        ) || [];

      setProducts(matchedProducts);

      const uniqueCategories = [
        ...new Set(matchedProducts.map((product) => product.category)),
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
    if (session) {
      getProducts();
    }
  }, [session]);

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
    />
  );
};

export default Page;
