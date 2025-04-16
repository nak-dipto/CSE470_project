"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/productCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const Products = ({ categories, products }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSort, setSelectedSort] = useState("");

  const sortCats = [
    "Newest First",
    "Oldest First",
    "Price Ascending",
    "Price Descending",
  ];

  // Function to filter products by category
  const filterTags = (array) => {
    if (selectedCategory.toLowerCase() === "all" || selectedCategory === "") {
      return array;
    } else {
      return array.filter(
        (el) => el.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
  };

  // Function to sort products
  const sortTags = (array) => {
    let sortedArray = [...array]; // Clone the array to avoid mutation

    if (selectedSort.toLowerCase() === "newest first") {
      return sortedArray.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      ); // Assuming `createdAt` field exists
    } else if (selectedSort.toLowerCase() === "oldest first") {
      return sortedArray.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      ); // Assuming `createdAt` field exists
    } else if (selectedSort.toLowerCase() === "price ascending") {
      return sortedArray.sort((a, b) => a.price - b.price);
    } else if (selectedSort.toLowerCase() === "price descending") {
      return sortedArray.sort((a, b) => b.price - a.price);
    } else {
      return sortedArray; // No sort, return the original array
    }
  };

  // Apply filter and then sorting
  let filteredList = filterTags(products);
  filteredList = sortTags(filteredList);

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
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </>
  );
};

export default Products;
