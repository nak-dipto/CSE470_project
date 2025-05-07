import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function ProductCard({
  product,
  addedtoCart,
  onQuantityChange,
}) {
  const [loading, setLoading] = useState(false);
  return (
    <Card className="flex flex-row w-full max-w-3xl h-[200px] m-4 overflow-hidden relative">
      <figure className="w-1/4 flex-shrink-0">
        <Image
          className="object-contain w-full h-full"
          src={product.image}
          width={150}
          height={150}
          alt={`${product.name} Image`}
        />
      </figure>

      <div className="flex flex-col justify-between flex-grow pr-5">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">
              <Link href={`/shop/${product._id}`}>
                <span aria-hidden="true" className="absolute inset-0" />
                {product.name}
              </Link>
            </h3>
            <p className="text-sm text-muted-foreground">{product.category}</p>
          </div>
          <div>
            <p className="text-lg font-semibold">
              ${product.price} X {product.quantity}
            </p>
            <p className="text-lg font-semibold">
              {" "}
              = ${product.price * product.quantity}
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4 z-15">
          <div className="flex items-center gap-2">
            Quantity:
            <Button
              onClick={() =>
                onQuantityChange(product._id, Math.max(1, product.quantity - 1))
              }
              variant="outline"
              size="sm"
            >
              -
            </Button>
            <span className="text-lg font-medium">{product.quantity}</span>
            <Button
              onClick={() =>
                onQuantityChange(product._id, product.quantity + 1)
              }
              variant="outline"
              size="sm"
            >
              +
            </Button>
          </div>

          <div className="flex gap-2">
            {product.stock === 0 ? (
              <Button variant="destructive" className="z-1">
                Out of Stock
              </Button>
            ) : (
              <Button
                variant="destructive"
                className="z-1"
                onClick={async () => {
                  try {
                    const response = await fetch(
                      `/api/cart/${addedtoCart._id}`,
                      {
                        method: "DELETE",
                      }
                    );

                    if (!response.ok) {
                      throw new Error(`HTTP error! status: ${response.status}`);
                    }
                  } catch (error) {
                    console.error(
                      "There was a problem with the fetch operation:",
                      error
                    );
                  } finally {
                    setLoading(false);
                    window.location.reload();
                  }
                }}
              >
                Remove from cart
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
