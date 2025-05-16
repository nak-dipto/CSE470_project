"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import ProductCard from "@/components/cartCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "./ui/button";
const Products = ({ products, cart }) => {
  const router = useRouter();
  const [isGift, setIsGift] = useState(false);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleCheckboxChange = (e) => {
    setIsGift(e.target.checked);
  };

  const { data: session } = useSession();
  let user = session?.user.email;
  const [filteredProducts, setFilteredProducts] = useState(
    products.map((product) => ({
      ...product,
      quantity: 1,
    }))
  );

  const handleQuantityChange = (productId, newQuantity) => {
    setFilteredProducts((prev) =>
      prev.map((item) => {
        if (item._id === productId) {
          if (newQuantity <= item.stock) {
            return { ...item, quantity: newQuantity };
          }
        }
        return item;
      })
    );
  };

  useEffect(() => {
    if (!user) return;
    const updatedProducts = products.map((product) => {
      const cartItem = cart.find((c) => c.productId === product._id);
      return {
        ...product,
        quantity: cartItem?.quantity || 1,
      };
    });
    setFilteredProducts(updatedProducts);
  }, [cart, products, user]);

  useEffect(() => {
    const quantity = filteredProducts.reduce((sum, product) => {
      const item = filteredProducts.find((q) => q._id === product._id);
      return sum + (item?.quantity || 0);
    }, 0);

    const price = filteredProducts.reduce((sum, product) => {
      const item = filteredProducts.find((q) => q._id === product._id);
      return sum + (product.price || 0) * (item?.quantity || 0);
    }, 0);

    setTotalQuantity(quantity);
    setTotalPrice(price);
  }, [filteredProducts]);

  const [shippingAddress, setShippingAddress] = useState("");

  const handleChange = (e) => {
    setShippingAddress(e.target.value);
  };

  return cart.length === 0 ? (
    <div className="flex flex-wrap justify-center mt-10 text-lg">
      No Products In Cart
    </div>
  ) : (
    <>
      <p className="text-5xl font-black mt-8 mx-10">Cart</p>
      <div className="flex justify-between items-start mt-10 mx-10">
        {/* Products List */}
        <div className="grid justify-center gap-6 w-full">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              user={user}
              addedtoCart={cart.find((item) => item.productId === product._id)}
              quantity={product.quantity}
              onQuantityChange={handleQuantityChange}
            />
          ))}
        </div>

        <Separator orientation="vertical" />

        {/* Order Summary */}
        <div className="ml-10 mt-15 min-w-[15%]">
          <div className="text-2xl font-medium mb-4">Order Summary</div>
          <div className="text-lg font-medium">
            Total Items: {totalQuantity}
          </div>
          <div className="text-lg font-medium mt-1">
            Total Price: ${totalPrice}
          </div>

          {/* Shipping Address */}
          <div className="space-y-2 mt-5">
            <Label htmlFor="shipping-address" className="text-lg font-medium">
              Shipping Address
            </Label>
            <Input
              id="shipping-address"
              type="text"
              placeholder="Enter your shipping address"
              value={shippingAddress}
              onChange={handleChange}
            />
          </div>

          {/* Gift Option */}
          <div className="flex items-center space-x-2 pt-4">
            <input
              type="checkbox"
              id="terms"
              checked={isGift}
              onChange={handleCheckboxChange}
              className="form-checkbox"
            />
            <label htmlFor="terms" className="text-md font-medium">
              Send As Gift
            </label>
          </div>

          {/* Place Order Button */}
          <Button
            disabled={!shippingAddress.trim()}
            className="mt-4 z-10"
            onClick={async () => {
              try {
                const response = await fetch("/api/order", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    user: session?.user.name,
                    shippingAddress,
                    isGift,
                    items: filteredProducts.map((product) => ({
                      productName: product.name,
                      quantity: product.quantity,
                      price: product.price,
                    })),
                  }),
                });
                if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                console.log("Order placed:", result);

                for (const item of filteredProducts) {
                  console.log(
                    "look here",
                    item.stock,
                    item.quantity,
                    item.stock - item.quantity
                  );
                  try {
                    const response = await fetch(`/api/shop/${item._id}`, {
                      method: "PUT",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        _id: item._id,
                        name: item.name,
                        description: item.description,
                        category: item.category,
                        price: item.price,
                        image: item.image,
                        stock: item.stock - item.quantity,
                      }),
                    });

                    if (!response.ok) {
                      throw new Error(`HTTP error! status: ${response.status}`);
                    }
                  } catch (error) {
                    console.error(
                      "There was a problem with the fetch operation:",
                      error
                    );
                  }
                }

                for (const item of cart) {
                  try {
                    const response = await fetch(`/api/cart/${item._id}`, {
                      method: "DELETE",
                    });

                    if (!response.ok) {
                      throw new Error(`HTTP error! status: ${response.status}`);
                    }
                  } catch (error) {
                    console.error(
                      "There was a problem with the fetch operation:",
                      error
                    );
                  }
                }
                router.push(`/invoice/${result._id}`);
              } catch (error) {
                console.error("Error placing order:", error);
              }
            }}
          >
            Place Order
          </Button>
        </div>
      </div>
    </>
  );
};
export default Products;
