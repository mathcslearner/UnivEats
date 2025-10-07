import { useState, useEffect } from 'react'
import ToggleButton from "../ToggleButton"
import SellerSidebar from "./SellerSidebar"
import AddMealButton, { type MealPayload } from './AddMealButton'
import MealCard from '../MealCard'
import axios from "axios"

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

const Listings = () => {
    const [meals, setMeals] = useState<MealCardProps[]>([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [initialLoad, setInitialLoad] = useState(true);

    useEffect(() => {
        const fetchMeals = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`/api/users/meals?limit=10&offset=${page * 10}`);
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

                if (page === 0) {
                    // First load - replace all meals
                    setMeals(newMeals);
                } else {
                    // Subsequent loads - append new meals
                    setMeals((prev) => [...prev, ...newMeals]);
                }

                // Stop fetching if fewer than 10 meals returned
                if (newMeals.length < 10) {
                    setHasMore(false);
                }
            } catch (err) {
                console.error("Error fetching meals:", err);
                setMeals([]); // Ensure meals is always an array even on error
            } finally {
                setLoading(false);
                setInitialLoad(false);
            }
        }

        fetchMeals();
    }, [page])

    const handleAddMeal = async (formData: Omit<MealPayload, "image_url">, File: File) => {
        try {
            const imgForm = new FormData();
            imgForm.append("image", File);

            const uploadRes = await axios.post<{ image_url: string }>("https://localhost:5000/api/upload", imgForm, { headers: { "Content-Type": "multipart/form-data" } });
            const { image_url } = uploadRes.data;

            const mealPayload: MealPayload = { ...formData, image_url };
            const res = await axios.post("https://localhost:5000/api/meals", mealPayload);
            console.log("Created meal:", res.data);
            
            // Refresh the meals list to show the newly added meal
            setPage(0);
            setHasMore(true);
        } catch (err) {
            console.error("Error creating meal:", err);
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
            <h1 className="text-gray-900 text-4xl font-bold mt-5">UnivEats Dashboard (Seller Mode)</h1>
            <nav className="fixed top-5 right-5 ">
                <ToggleButton />
            </nav>
            <SellerSidebar current={"Listings"} />
            <h2 className="text-2xl mt-2">Welcome back to UnivEats!</h2>
            <h2 className="text-2xl mt-2">Manage your meal listings here. Click the button to get started!</h2>
            <AddMealButton onSubmit={handleAddMeal} />
            
            {initialLoad ? (
                <div className="text-center mt-4">Loading your meals...</div>
            ) : (
                <>
                    <div id="meals-container" className="grid grid-cols-2 gap-6 mx-auto w-3/4 mt-4">
                        {meals && meals.length > 0 ? (
                            meals.map((meal, id) => {
                                return (
                                    <MealCard 
                                        key={`${meal.title}-${id}`} 
                                        {...meal} 
                                        price={meal.price ?? 0}
                                    />
                                )
                            })
                        ) : (
                            <div className="col-span-2 text-center text-gray-500 py-8">
                                No meals listed yet. Click the button above to add your first meal!
                            </div>
                        )}
                    </div>
                    
                    {hasMore && meals && meals.length > 0 && (
                        <button 
                            onClick={() => setPage((prev) => prev + 1)} 
                            disabled={loading} 
                            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                        >
                            {loading ? "Loading..." : "Load More"}
                        </button>
                    )}
                </>
            )}
        </div>
    )
}

export default Listings