import { useState, useEffect } from "react";
import { Compass } from "lucide-react";
import BuyerSidebar from "./BuyerSidebar";
import ToggleButton from "../ToggleButton";
import MealCard from "../MealCard";
import axios from "axios";

interface MealCardProps {
  title: string;
  description: string;
  price: number;
  cuisine: string;
  dietary_tags: string[];
  availability: string;
  pickup_location: string;
  image_url: string;
}

const Explore = () => {
  const [meals, setMeals] = useState<MealCardProps[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);

  const fetchMeals = async (pageNum: number) => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/meals?limit=10&offset=${pageNum * 10}`);
      const responseData = res.data;
      
      // Handle different possible response structures
      let newMeals: MealCardProps[] = [];
      
      if (Array.isArray(responseData)) {
        // If response is directly an array
        newMeals = responseData;
      } else if (responseData && Array.isArray(responseData.data)) {
        // If response has data property that is an array
        newMeals = responseData.data;
      } else if (responseData && Array.isArray(responseData.meals)) {
        // If response has meals property that is an array
        newMeals = responseData.meals;
      } else {
        // If no array found, log and use empty array
        console.warn("Unexpected API response structure:", responseData);
        newMeals = [];
      }

      if (pageNum === 0) {
        // First load - replace all meals
        setMeals(newMeals);
      } else {
        // Subsequent loads - append new meals
        setMeals((prev) => [...prev, ...newMeals]);
      }

      // Stop fetching if fewer than 10 meals returned
      if (newMeals.length < 10) setHasMore(false);
    } catch (err) {
      console.error("Error fetching meals:", err);
      setMeals([]); // Ensure meals is always an array even on error
    } finally {
      setLoading(false);
      setInitialLoad(false);
    }
  };

  useEffect(() => {
    fetchMeals(0); // Start with page 0
  }, []);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchMeals(nextPage);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <div className="flex items-center justify-center gap-2 mt-3">
        <Compass />
        <h1 className="text-3xl font-bold text-center text-gray-700">Explore Page</h1>
      </div>

      <nav className="fixed top-5 right-5">
        <ToggleButton />
      </nav>

      <BuyerSidebar current={"Explore"} />

      <p className="text-gray-700 text-center text-xl mt-2">
        Enjoy the latest selection of meals! Filter based on cuisine, restrictions, and price.
      </p>

      {initialLoad ? (
        <div className="text-center mt-4">Loading meals...</div>
      ) : (
        <>
          <div id="meals-container" className="grid grid-cols-2 gap-6 mx-auto w-3/4 mt-4">
            {meals && meals.length > 0 ? (
              meals.map((meal, id) => (
                <MealCard
                  key={`${meal.title}-${id}`}
                  {...meal}
                  price={meal.price ?? 0} 
                />
              ))
            ) : (
              <div className="col-span-2 text-center text-gray-500">
                No meals available at the moment.
              </div>
            )}
          </div>

          {hasMore && meals && meals.length > 0 && (
            <div className="text-center mt-6">
              <button
                onClick={handleLoadMore}
                disabled={loading}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Explore;
