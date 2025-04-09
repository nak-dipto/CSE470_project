"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function AllProducts({ className, ...props }) {
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState([]);
  const [totalProducts, setTotalProducts] = useState([]);
  const [totalStock, setTotalStock] = useState([]);
  const router = useRouter();
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/shop/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        location.reload();
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const getProducts = async () => {
    try {
      const response = await fetch("/api/shop");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      console.log(data.products);
      setProducts(data.products);
      setTotalPrice(
        data.products.reduce((acc, product) => acc + product.price, 0)
      );
      setTotalStock(
        data.products.reduce((acc, product) => acc + product.stock, 0)
      );
      setTotalProducts(data.products.length);
      return data;
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <p className="mt-5 w-full text-center text-2xl">All Products</p>
      <div className="flex min-h-full w-full items-center justify-center px-5">
        <div className="w-full max-w-.75">
          <div className={cn("flex flex-col gap-6", className)}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px] text-center">
                    Added On
                  </TableHead>
                  <TableHead className="w-[100px] text-center">Name</TableHead>
                  <TableHead className="text-center">Category</TableHead>
                  <TableHead className="text-center">Price</TableHead>
                  <TableHead className="text-center">Stock</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell className="text-center">
                      {`${product.createdAt.slice(
                        5,
                        7
                      )}-${product.createdAt.slice(
                        8,
                        10
                      )}-${product.createdAt.slice(
                        0,
                        4
                      )} ${product.createdAt.slice(11, 19)}`}
                    </TableCell>
                    <TableCell className="font-medium text-center">
                      {product.name}
                    </TableCell>
                    <TableCell className="text-center">
                      {product.category}
                    </TableCell>
                    <TableCell className="text-center">
                      ${product.price}
                    </TableCell>
                    <TableCell className="text-center">
                      {product.stock}
                    </TableCell>
                    <TableCell className="flex justify-center items-center h-full">
                      <FaEdit
                        className="text-lg  mr-2 cursor-pointer"
                        onClick={() =>
                          router.push(`/admin/shop/${product._id}`)
                        }
                      />
                      <FaTrashAlt
                        className="text-lg cursor-pointer"
                        onClick={() => handleDelete(product._id)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell className="text-center">Total</TableCell>
                  <TableCell className="text-center">{totalProducts}</TableCell>
                  <TableCell className="text-center"></TableCell>
                  <TableCell className="text-center">${totalPrice}</TableCell>
                  <TableCell className="text-center">{totalStock}</TableCell>
                  <TableCell className="text-center"></TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}
