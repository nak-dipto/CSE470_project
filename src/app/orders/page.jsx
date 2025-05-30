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
import { FiPrinter } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function AllOrders({ className, ...props }) {
  const { data: session } = useSession();
  let currentUser = session?.user.name;
  const [orders, setOrders] = useState([]);
  const router = useRouter();
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/order/${id}`, {
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

  const getOrders = async () => {
    try {
      const response = await fetch("/api/order");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setOrders(data.orders);
      return data;
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };
  // console.log(orders);
  useEffect(() => {
    getOrders();
  }, []);
  return (
    <>
      <p className="mt-5 w-full text-center text-2xl">
        {currentUser}'s Order History
      </p>
      <div className="flex min-h-full w-full items-center justify-center px-5">
        <div className="w-full max-w-.75">
          <div className={cn("flex flex-col gap-6", className)}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px] text-center">
                    Order Time
                  </TableHead>
                  <TableHead className="w-[100px] text-center">
                    Customer Name
                  </TableHead>
                  <TableHead className="text-center">
                    Shipping Address
                  </TableHead>
                  <TableHead className="text-center">Total Price</TableHead>
                  <TableHead className="text-center">Total Items</TableHead>
                  <TableHead className="text-center">Sent as Gift</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders
                  .filter((order) => order.user === currentUser)
                  .map((order) => (
                    <TableRow key={order._id}>
                      <TableCell className="text-center">
                        {`${order.createdAt.slice(
                          5,
                          7
                        )}-${order.createdAt.slice(
                          8,
                          10
                        )}-${order.createdAt.slice(
                          0,
                          4
                        )} ${order.createdAt.slice(11, 19)}`}
                      </TableCell>
                      <TableCell className="font-medium text-center">
                        {order.user}
                      </TableCell>
                      <TableCell className="text-center">
                        {order.shippingAddress}
                      </TableCell>
                      <TableCell className="text-center">
                        $
                        {order.items.reduce(
                          (sum, item) => sum + item.quantity * item.price,
                          0
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {order.items.length}
                      </TableCell>
                      <TableCell className="text-center">
                        {order.isGift ? "Yes" : "No"}
                      </TableCell>
                      <TableCell className="flex justify-center items-center h-full">
                        <FiPrinter
                          className="text-lg  mr-2 cursor-pointer"
                          onClick={() => router.push(`/invoice/${order._id}`)}
                        />
                        <FaTrashAlt
                          className="text-lg cursor-pointer"
                          onClick={() => handleDelete(order._id)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}
