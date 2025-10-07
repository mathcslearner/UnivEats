import { useEffect, useState } from "react";
import axios from "axios";
import BuyerSidebar from "./BuyerSidebar";
import ToggleButton from "../ToggleButton";

interface CartItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  seller_id: number;
  meal_id: number;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [updatingIds, setUpdatingIds] = useState<number[]>([]);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");

  // Fetch shopping list
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get<{ shopping_list: CartItem[] }>("/api/cart");
        const validItems = Array.isArray(res.data.shopping_list)
          ? res.data.shopping_list.filter(
              (i): i is CartItem =>
                i &&
                typeof i.id === "number" &&
                typeof i.name === "string" &&
                typeof i.quantity === "number" &&
                typeof i.price === "number" &&
                typeof i.meal_id === "number" &&
                typeof i.seller_id === "number"
            )
          : [];
        setCartItems(validItems);
      } catch (err) {
        console.error("Error fetching cart:", err);
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  // Update quantity safely
  const updateQuantity = async (id: number, delta: number) => {
    if (updatingIds.includes(id)) return;

    const item = cartItems.find((i) => i.id === id);
    if (!item) return;

    const newQuantity = Math.max(1, item.quantity + delta);
    const updatedCart = cartItems.map((i) =>
      i.id === id ? { ...i, quantity: newQuantity } : i
    );

    setCartItems(updatedCart);
    setUpdatingIds((prev) => [...prev, id]);

    try {
      await axios.put("/api/cart", { shopping_list: updatedCart });
    } catch (err) {
      console.error("Error updating cart:", err);
      setCartItems(cartItems); // rollback
    } finally {
      setUpdatingIds((prev) => prev.filter((x) => x !== id));
    }
  };

  // Concurrent checkout
  const handleCheckout = async () => {
    if (!cartItems.length) return;
    setSubmitting(true);

    try {
      const orderPromises = cartItems.map((item) =>
        axios.post("/api/orders", {
          meal_id: item.meal_id,
          seller_id: item.seller_id,
          quantity: item.quantity,
          total_price: item.price * item.quantity,
        })
      );

      await Promise.all(orderPromises);

      await axios.put("/api/cart/clear");

      setCartItems([]);
      setModalMessage("Order successfully submitted! Thank you for your purchase.");
      setShowModal(true);
    } catch (err) {
      console.error("Error submitting orders:", err);
      setModalMessage("Something went wrong while submitting your order. Please try again.");
      setShowModal(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p>Loading cart...</p>;

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <BuyerSidebar current={"Cart"} />
      <h1 className="text-gray-900 text-4xl font-bold mt-5 text-center">Cart</h1>
      <nav className="fixed top-5 right-5">
        <ToggleButton />
      </nav>
      <h2 className="text-2xl mt-2 mb-5 text-center">
        Finished browsing your next meals? Manage the meals you chose and checkout when you're ready.
      </h2>

      <table className="table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Meal Name</th>
            <th className="border border-gray-300 px-4 py-2">Price</th>
            <th className="border border-gray-300 px-4 py-2">Quantity</th>
            <th className="border border-gray-300 px-4 py-2">Subtotal</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id}>
              <td className="border border-gray-300 px-4 py-2">{item.id}</td>
              <td className="border border-gray-300 px-4 py-2">{item.name}</td>
              <td className="border border-gray-300 px-4 py-2">${item.price.toFixed(2)}</td>
              <td className="border border-gray-300 px-4 py-2">{item.quantity}</td>
              <td className="border border-gray-300 px-4 py-2">
                ${(item.price * item.quantity).toFixed(2)}
              </td>
              <td className="border border-gray-300 px-4 py-2 flex gap-2">
                <button
                  className={`px-2 rounded text-white ${
                    updatingIds.includes(item.id) ? "bg-gray-400" : "bg-green-500"
                  }`}
                  onClick={() => updateQuantity(item.id, 1)}
                  disabled={updatingIds.includes(item.id)}
                >
                  +
                </button>
                <button
                  className={`px-2 rounded text-white ${
                    updatingIds.includes(item.id) ? "bg-gray-400" : "bg-red-500"
                  }`}
                  onClick={() => updateQuantity(item.id, -1)}
                  disabled={updatingIds.includes(item.id)}
                >
                  -
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={4} className="text-right font-bold px-4 py-2 border border-gray-300">
              Total:
            </td>
            <td className="font-bold px-4 py-2 border border-gray-300">${totalPrice.toFixed(2)}</td>
            <td className="border border-gray-300"></td>
          </tr>
        </tbody>
      </table>

      {/* Checkout button */}
      <button
        className={`mt-5 px-6 py-3 rounded text-white ${
          submitting ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        }`}
        onClick={handleCheckout}
        disabled={submitting || cartItems.length === 0}
      >
        {submitting ? "Submitting..." : "Checkout"}
      </button>

      {/* Confirmation modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-80 text-center shadow-lg">
            <p className="mb-4">{modalMessage}</p>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;


