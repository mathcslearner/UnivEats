import React, { useState } from 'react';

interface Review {
  id: number;
  name: string;
  title: string;
  content: string;
  avatar?: string; // optional avatar image URL
}

interface ReviewsProps {
  reviews: Review[];
}

const Reviews: React.FC<ReviewsProps> = ({ reviews }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const review = reviews[currentIndex];

  return (
    <div id="reviews-container">        
        <div className="flex flex-col items-center justify-center w-full max-w-xl mx-auto p-4">
        <div className="bg-white shadow-lg rounded-xl p-6 text-center transition-transform transform hover:scale-105 duration-300 w-full">
            <h1 className="text-gray-900 text-2xl mb-2">User Reviews:</h1>
            {review.avatar && (
            <img
                src={review.avatar}
                alt={review.name}
                className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
            />
            )}
            <h3 className="text-lg font-semibold text-gray-800">{review.name}</h3>
            <p className="text-sm text-gray-500 mb-2">{review.title}</p>
            <p className="text-gray-700">{review.content}</p>
        </div>

        <div className="flex gap-4 mt-4">
            <button
            onClick={prevReview}
            className="px-4 py-2 rounded-full bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300 transition"
            >
            Previous
            </button>
            <button
            onClick={nextReview}
            className="px-4 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
            Next
            </button>
        </div>
        </div>
    </div>
  );
};

export default Reviews;
