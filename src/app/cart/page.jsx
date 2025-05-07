"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Products from "@/components/cartPage";
import { Loader2 } from "lucide-react";
const Page = () => {
  const { data: session } = useSession();
  let user = session?.user.email;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const getProducts = async () => {
    try {
      const response = await fetch("/api/shop");
      const response1 = await fetch("/api/cart");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const data1 = await response1.json();
      const filteredCart = data1.cart.filter((item) => item.user === user);
      setCart(filteredCart || []);

      const matchedProducts =
        data.products?.filter((product) =>
          data1.cart.some(
            (cart) => cart.productId === product._id && cart.user === user
          )
        ) || [];

      setProducts(matchedProducts);
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

  return <Products products={products} cart={cart} />;
};

export default Page;
