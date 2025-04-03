import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Bookmark, PlusIcon } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export default function ProductCard({ product }) {
  console.log(product);
  return (
    <Card className="w-[300px] group relative space-y-4 overflow-hidden m-4 p-0">
      <figure className="group-hover:opacity-90">
        <Button
          variant="ghost"
          size="icon"
          className="bg-white/70 absolute top-3 end-3 rounded-full dark:text-black"
        >
          <Bookmark className="size-4" />
        </Button>
        <Image
          className="aspect-square object-cover w-full"
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
        {product.stock == 0 ? (
          <Button variant="destructive" className="w-full z-100">
            Out of Stock
          </Button>
        ) : (
          <Button variant="ghost" className="w-full z-100">
            <PlusIcon className="size-4 me-1" /> Add to Cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}