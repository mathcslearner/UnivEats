import { useEffect, useState } from "react";
import axios from "axios";
import ToggleButton from "../ToggleButton";
import SellerSidebar from "./SellerSidebar";

interface Order {
  id: number;
  meal_id: number;
  seller_id: number;
  quantity: number;
  total_price: number;
  pickup_time?: string;
  created_at: string;
  updated_at: string;
  meal_name?: string;
}

const SellerOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const sellerId = localStorage.getItem("userId");
        if (!sellerId) {
          console.error("No seller ID found in localStorage");
          setOrders([]);
          setLoading(false);
          return;
        }

        const res = await axios.get<{ orders: Order[] }>(
          `/api/orders/seller/${sellerId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setOrders(res.data.orders || []);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p className="mt-10 text-xl">Loading orders...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <h1 className="text-gray-900 text-4xl font-bold mt-5 text-center">
        UnivEats Dashboard (Seller Mode)
      </h1>

      <nav className="fixed top-5 right-5">
        <ToggleButton />
      </nav>

      <SellerSidebar current={"Orders"} />

      <h2 className="text-2xl mt-8 mb-4 font-semibold">Your Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-600 text-lg">You have no orders yet.</p>
      ) : (
        <table className="table-auto border-collapse border border-gray-300 shadow-md bg-white">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2">Order ID</th>
              <th className="border border-gray-300 px-4 py-2">Meal</th>
              <th className="border border-gray-300 px-4 py-2">Quantity</th>
              <th className="border border-gray-300 px-4 py-2">Total Price</th>
              <th className="border border-gray-300 px-4 py-2">Pickup Time</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{order.id}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {order.meal_name || order.meal_id}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {order.quantity}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  ${order.total_price.toFixed(2)}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {order.pickup_time
                    ? new Date(order.pickup_time).toLocaleString()
                    : "N/A"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                    onClick={() => setSelectedOrder(order)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg text-gray-800">
            <h3 className="text-2xl font-semibold mb-4">Order Details</h3>
            <p>
              <strong>Order ID:</strong> {selectedOrder.id}
            </p>
            <p>
              <strong>Meal:</strong>{" "}
              {selectedOrder.meal_name || selectedOrder.meal_id}
            </p>
            <p>
              <strong>Quantity:</strong> {selectedOrder.quantity}
            </p>
            <p>
              <strong>Total Price:</strong> $
              {selectedOrder.total_price.toFixed(2)}
            </p>
            <p>
              <strong>Pickup Time:</strong>{" "}
              {selectedOrder.pickup_time
                ? new Date(selectedOrder.pickup_time).toLocaleString()
                : "N/A"}
            </p>
            <p>
              <strong>Created:</strong>{" "}
              {new Date(selectedOrder.created_at).toLocaleString()}
            </p>
            <div className="mt-5 text-center">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => setSelectedOrder(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerOrders;