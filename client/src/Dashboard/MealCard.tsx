import { useState } from "react";
import axios from "axios";


interface MealCardProps {
  id: number;
  title: string;
  description: string;
  price: number;
  cuisine: string;
  dietary_tags: any[];
  availability: string;
  pickup_location: string;
  image_url: string;
}

const MealCard: React.FC<MealCardProps> = ({
  id,
  title,
  description,
  price,
  cuisine,
  dietary_tags = [],
  availability,
  pickup_location,
  image_url,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async () => {
      try {
        const payload = {
          meal_id: id, // your meal ID
          quantity: quantity
        };
    
        // Send PUT request to backend
        const response = await axios.put("/api/cart", payload);
    
        // Backend returns updated cart
        console.log("Updated cart:", response.data);
    
        alert(`${quantity} x ${title} added to cart!`);
        setIsOpen(false);
      } catch (error) {
        console.error("Error adding to cart:", error);
        alert("Failed to add to cart. Please try again.");
      }
  };

  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => Math.max(1, q - 1));

  return (
    <>
      {/* Compact Card */}
      <div
        onClick={() => setIsOpen(true)}
        className="cursor-pointer rounded-2xl overflow-hidden shadow hover:shadow-lg transition bg-white w-full"
      >
        <div className="relative w-full h-48">
          <img src={image_url} alt={title} className="object-cover w-full h-full" />
        </div>
        <div className="p-4 space-y-2">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">{title}</h2>
            <span className="text-primary font-bold">${price.toFixed(2)}</span>
          </div>
          <p className="text-sm text-gray-500">{cuisine}</p>
          <div className="flex flex-wrap gap-2">
            {dietary_tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 flex justify-center items-center z-50"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            <img
              src={image_url}
              alt={title}
              className="rounded-xl w-full h-56 object-cover mb-4"
            />

            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="text-sm text-gray-500 mb-2">{cuisine}</p>
            <p className="text-sm text-gray-700 mb-4">{description}</p>

            <div className="flex flex-wrap gap-2 mb-3">
              {dietary_tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-gray-300 text-gray-700 text-xs px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="text-sm text-gray-600 mb-1">
              <strong>Availability:</strong>{" "}
              {typeof availability === "string"
                ? availability
                : availability
                ? "Available"
                : "Unavailable"}
            </div>
            <div className="text-sm text-gray-600 mb-4">
              <strong>Pickup:</strong> {pickup_location}
            </div>

            {/* Price */}
            <div className="text-right text-lg font-bold mb-6">
              ${price.toFixed(2)}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={decrement}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300"
                >
                  −
                </button>
                <span className="text-lg font-medium">{quantity}</span>
                <button
                  onClick={increment}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300"
                >
                  +
                </button>
              </div>

              <span className="text-gray-700 font-medium">
                Total: ${(price * quantity).toFixed(2)}
              </span>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MealCard;

