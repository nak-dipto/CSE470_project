"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { use, useEffect, useState } from "react";

const Product = ({ params }) => {
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(false);

  const { id } = use(params);

  const getProduct = async () => {
    try {
      setLoading(true);

      const response = await fetch(`/api/shop/${id}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      setProduct(data.product);

      return data;
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!product && !loading) {
    return (
      <div>
        <h1 className="text-3xl font-bold">Product not found!</h1>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-screen-xl px-2.5 md:px-20">
      <div>
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="mt-10 lg:col-start-1 lg:row-span-2 lg:mt-0 lg:self-center">
            <div className="group relative aspect-square overflow-hidden rounded-xl">
              <div className="h-full w-full">
                <div className="z-1 relative h-full w-full">
                  <Image
                    fill
                    loading="eager"
                    className="-z-10 h-full w-full object-cover object-center"
                    src={product.image}
                    alt="Product image"
                    objectFit="contain"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:max-w-lg lg:self-end">
            <div className="mt-4">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-4xl">
                {product.name}
              </h1>
            </div>

            <section className="mt-4">
              <div className="mt-4 space-y-6">
                <p className="text-base text-muted-foreground">
                  {product.description}
                </p>
              </div>

              <p className="font-medium text-gray-900 dark:text-gray-50 mt-4">
                ${product.price} USD
              </p>
            </section>

            <div className="mt-10">
              <Button>Add to cart</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
