import {useState, useEffect} from 'react';
import {Compass} from 'lucide-react';
import BuyerSidebar from './BuyerSidebar';
import ToggleButton from '../ToggleButton';
import MealCard from '../MealCard';
import axios from 'axios';

interface MealCardProps {
    title: string;
    description: string;
    price: Number;
    cuisine: string;
    dietary_tags: any[];
    availability: string;
    pickup_location: string;
    image_url: string;
}

const Explore = () => {
    const [meals, setMeals] = useState<MealCardProps[]>([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        const fetchMeals = async () => {
            try {
                setLoading(true);

                const res = await axios.get(`/api/meals?limit=10&offset=${page*10}`);
                const newMeals = res.data;

                if (newMeals.length < 10){
                    setHasMore(false);
                }

                setMeals((prev) => [...prev, ...newMeals]);
            } catch (err) {
                console.error("Error fetching meals:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchMeals();
    }, [page])

    return(
        <body className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
            <div className="flex items-center justify-center gap-2 mt-3">
                <Compass/>
                <h1 className="text-3xl font-bold text-center text-gray-700">Explore Page</h1>
            </div>
            <nav className="fixed top-5 right-5 ">
                <ToggleButton />
            </nav>
            <BuyerSidebar current={"Explore"}/>
            <p className="text-gray-700 text-center text-xl mt-2">Enjoy the latest selection of meals! It is possible to filter based on cuisine, restrictions and price.</p>
            <div id="meals-container" className="grid grid-cols-2 gap-6 mx-auto w-3/4 mt-4">
                {meals.map((meal, id) => {
                    return (
                        <MealCard key={id} {...meal} />
                    )
                })}
            </div>
            {hasMore && (
                <button onClick={()=> setPage((prev) => prev+1)} disabled={loading} className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50">
                    {loading ? "Loading..." : "Load More"}
                </button>
            )}
        </body>
    )
}

export default Explore