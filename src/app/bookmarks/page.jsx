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
  const [cart, setCart] = useState([]);
  const getProducts = async () => {
    try {
      const response = await fetch("/api/shop");
      const response1 = await fetch("/api/cart");
      const response2 = await fetch("/api/bookmarks");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      if (!response1.ok) {
        throw new Error(`HTTP error! status: ${response1.status}`);
      }
      if (!response2.ok) {
        throw new Error(`HTTP error! status: ${response2.status}`);
      }

      const data = await response.json();
      const data1 = await response1.json();
      const data2 = await response2.json();

      const userBookmarks =
        data2.bookmarks?.filter((item) => item.user === user) || [];
      setBookmarks(userBookmarks);
      console.log(userBookmarks);

      const matchedProducts =
        data.products?.filter((product) =>
          userBookmarks.some((bookmark) => bookmark.productId === product._id)
        ) || [];

      setProducts(matchedProducts);
      setCart(data1.cart || []);

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
    <>
      <p className="text-5xl font-black mt-8 mx-10">Bookmarks</p>
      <Products
        categories={categories}
        products={products}
        bookmarks={bookmarks}
        cart={cart}
      />
    </>
  );
};

export default Page;
