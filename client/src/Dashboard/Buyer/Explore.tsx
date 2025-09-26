import {Compass} from 'lucide-react';
import BuyerSidebar from './BuyerSidebar';
import ToggleButton from '../ToggleButton';
import MealCard from '../MealCard';

//Hardcoded meals
const meals = [
    {
      title: "Margherita Pizza",
      description: "Classic Neapolitan pizza with tomato, mozzarella, and basil.",
      price: 14.99,
      cuisine: "Italian",
      dietary_tags: ["Vegetarian", "Halal"],
      availability: "10am - 9pm",
      pickup_location: "123 Main St, Toronto",
      image_url: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Pad Thai",
      description:
        "Stir-fried rice noodles with shrimp, peanuts, and tamarind sauce.",
      price: 12.5,
      cuisine: "Asian",
      dietary_tags: ["Gluten-Free"],
      availability: "12am-8pm",
      pickup_location: "88 King St, Toronto",
      image_url: "https://plus.unsplash.com/premium_photo-1669150852117-7b1106702067?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        title: "test1",
        description: "description1", 
        price: 13.5,
        cuisine: "test",
        dietary_tags: [],
        availability: "11pm",
        pickup_location: "SLC",
        image_url: "a"
    }
  ];

const Explore = () => {
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
        </body>
    )
}

export default Explore