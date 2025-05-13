"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import ProductCard from "@/components/productCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const Products = ({ categories, products, bookmarks = [], cart = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSort, setSelectedSort] = useState("");

  const { data: session } = useSession();
  const user = session?.user?.email ?? "";

  const sortCats = [
    "Newest First",
    "Oldest First",
    "Price Ascending",
    "Price Descending",
  ];

  const filterTags = (array) => {
    if (selectedCategory.toLowerCase() === "all" || selectedCategory === "") {
      return array;
    } else {
      return array.filter(
        (el) => el.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
  };

  const sortTags = (array) => {
    let sortedArray = [...array];

    switch (selectedSort.toLowerCase()) {
      case "newest first":
        return sortedArray.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      case "oldest first":
        return sortedArray.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
      case "price ascending":
        return sortedArray.sort((a, b) => a.price - b.price);
      case "price descending":
        return sortedArray.sort((a, b) => b.price - a.price);
      default:
        return sortedArray;
    }
  };

  const userCart = cart?.filter((item) => item.user === user);
  const userBookmarks = bookmarks?.filter((item) => item.user === user);

  const filteredList = sortTags(filterTags(products));

  return (
    <>
      <div className="flex items-center gap-4 mt-5 mx-10 justify-between">
        <div className="flex">
          <Label htmlFor="options" className="text-xl pr-2">
            Filter By:
          </Label>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger id="options" className="w-[180px]">
              <SelectValue placeholder="Select a Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex">
          <Label htmlFor="sort" className="text-xl pr-2">
            Sort By:
          </Label>
          <Select value={selectedSort} onValueChange={setSelectedSort}>
            <SelectTrigger id="sort" className="w-[180px]">
              <SelectValue placeholder="Sorting Options" />
            </SelectTrigger>
            <SelectContent>
              {sortCats.map((sortcat) => (
                <SelectItem key={sortcat} value={sortcat}>
                  {sortcat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-wrap justify-center mt-10">
        {filteredList.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            user={user}
            bookmarked={userBookmarks?.find(
              (item) => item.productId === product._id
            )}
            addedtoCart={userCart?.find(
              (item) => item.productId === product._id
            )}
          />
        ))}
      </div>
    </>
  );
};

export default Products;
