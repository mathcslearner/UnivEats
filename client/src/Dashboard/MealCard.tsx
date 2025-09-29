import { useState } from "react";

interface MealCardProps {
    title: string;
    description: string;
    price: number;
    cuisine: string;
    dietary_tags: any[];
    availability: string;
    pickup_location: string;
    image_url: string;
}

const MealCard:React.FC<MealCardProps> = ({title,
    description,
    price,
    cuisine,
    dietary_tags = [],
    availability,
    pickup_location,
    image_url}) => {
        const [isOpen, setIsOpen] = useState(false);

          return (
    <>
      {/* Compact Card View */}
      <div
        onClick={() => setIsOpen(true)}
        className="cursor-pointer rounded-2xl overflow-hidden shadow hover:shadow-lg transition bg-white w-full"
      >
        <div className="relative w-full h-48">
          <img
            src={image_url}
            alt={title}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="p-4 space-y-2">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">{title}</h2>
            <span className="text-primary font-bold">${price?.toFixed(2)}</span>
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

      {/* Modal (only rendered when open) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 flex justify-center items-center z-50"
          onClick={() => setIsOpen(false)} // click outside to close
        >
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative"
            onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
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

            <div className="text-right text-lg font-bold">${price.toFixed(2)}</div>
          </div>
        </div>
      )}
    </>
  );
}

export default MealCard