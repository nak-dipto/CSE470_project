import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Bookmark, PlusIcon, BookmarkCheck } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useState } from "react";
import { Loader2 } from "lucide-react";
export default function ProductCard({
  product,
  user,
  bookmarked,
  addedtoCart,
}) {
  const [loading, setLoading] = useState(false);
  const deleteBookmark = async (id) => {
    try {
      const response = await fetch(`/api/bookmarks/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    } finally {
      setLoading(false);

      window.location.reload();
    }
  };
  const handleBookmark = async () => {
    if (user) {
      try {
        setLoading(true);

        const response = await fetch("/api/bookmarks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId: product,
            user,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        return data;
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      } finally {
        setLoading(false);

        window.location.reload();
      }
    } else {
      alert("You need to sign in to review a product!");
    }
    // console.log(user);
  };
  return (
    <Card className="w-[300px] group relative space-y-4 overflow-hidden m-4 p-0">
      <Button
        variant="ghost"
        size="icon"
        className="bg-white/70 absolute top-3 end-3 rounded-full dark:text-black z-1 flex items-center gap-2 px-3"
        onClick={() =>
          bookmarked ? deleteBookmark(bookmarked._id) : handleBookmark()
        }
        disabled={loading}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : bookmarked ? (
          <BookmarkCheck className="h-4 w-4" />
        ) : (
          <Bookmark className="h-4 w-4" />
        )}
      </Button>

      <figure className="group-hover:opacity-90">
        <Image
          className="aspect-square object-contain"
          src={product.image}
          width={500}
          height={500}
          alt={`${product.name} Image`}
        />
      </figure>
      <CardContent className="px-4 py-0 m-0">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg">
              <Link href={`/shop/${product._id}`}>
                <span aria-hidden="true" className="absolute inset-0" />
                {product.name}
              </Link>
            </h3>
            <p className="text-sm text-muted-foreground">{product.category}</p>
          </div>
          <p className="text-lg font-semibold">${product.price}</p>
        </div>
      </CardContent>
      <CardFooter className="border-t-1 p-1">
        {product.stock === 0 ? (
          <Button variant="destructive" className="w-full z-1">
            Out of Stock
          </Button>
        ) : addedtoCart ? (
          <Button
            variant="ghost"
            className="w-full z-1"
            onClick={async () => {
              try {
                const response = await fetch(`/api/cart/${addedtoCart._id}`, {
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
              } finally {
                setLoading(false);
                window.location.reload();
              }
            }}
          >
            Added
          </Button>
        ) : (
          <Button
            variant="ghost"
            className="w-full z-1"
            onClick={async () => {
              try {
                const response = await fetch("/api/cart", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    productId: product._id,
                    user: user,
                  }),
                });

                if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                console.log("Item added to cart:", result);
              } catch (error) {
                console.error("Error adding to cart:", error);
              } finally {
                setLoading(false);
                window.location.reload();
              }
            }}
          >
            <PlusIcon className="size-4 me-1" /> Add to Cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
