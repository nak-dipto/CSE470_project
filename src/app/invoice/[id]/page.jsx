"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState, use } from "react";

const Order = ({ params }) => {
  const { data: session } = useSession();
  const user = session?.user?.email;

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = use(params);

  const getOrder = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/invoice/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setOrder(data.order);
      console.log(data.order);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id && session) getOrder();
  }, [id, session]);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (!order) {
    return <p className="text-center mt-10">Order not found.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 shadow-md rounded-md mt-10 border">
      <h1 className="text-2xl font-bold mb-4 text-center">Invoice</h1>

      <div className="mb-6">
        <p>
          <strong>Order ID:</strong> {order._id}
        </p>
        <p>
          <strong>User:</strong> {order.user}
        </p>
        <p>
          <strong>Shipping Address:</strong> {order.shippingAddress}
        </p>
        <p>
          <strong>Gift:</strong> {order.isGift ? "Yes" : "No"}
        </p>
        <p>
          <strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}
        </p>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Items:</h2>
        <table className="w-full text-left border">
          <thead>
            <tr className="border-b">
              <th className="p-2">Product</th>
              <th className="p-2">Qty</th>
              <th className="p-2">Unit Price</th>
              <th className="p-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item) => (
              <tr key={item._id} className="border-b">
                <td className="p-2">{item.productName}</td>
                <td className="p-2">{item.quantity}</td>
                <td className="p-2">${item.price}</td>
                <td className="p-2">${item.quantity * item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-right mt-4">
          <strong>
            Total: ${" "}
            {order.items.reduce(
              (sum, item) => sum + item.quantity * item.price,
              0
            )}
          </strong>
        </div>
      </div>
    </div>
  );
};

export default Order;
