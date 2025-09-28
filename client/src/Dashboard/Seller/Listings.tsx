import {useState} from 'react'
import ToggleButton from "../ToggleButton"
import SellerSidebar from "./SellerSidebar"
import AddMealButton, {type MealPayload} from './AddMealButton'
import axios from "axios"

const Listings = () => {
    const handleAddMeal = async (formData: Omit<MealPayload, "image_url">, File: File) => {
        const imgForm = new FormData();
        imgForm.append("image", File);

        const uploadRes = await axios.post<{image_url: string}>("https://localhost:5000/api/upload", imgForm, {headers: {"Content-Type": "multipart/form-data"}});
        const {image_url} = uploadRes.data;

        const mealPayload: MealPayload = {...formData, image_url};
        const res = await axios.post("https://localhost:5000/api/meals", mealPayload);
        console.log("Created meal:", res.data);
    }

    return(
        <body className="min-h-screen flex flex-col items-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
            <h1 className="text-gray-900 text-4xl font-bold mt-5">UnivEats Dashboard (Seller Mode)</h1>
            <nav className="fixed top-5 right-5 ">
                <ToggleButton />
            </nav>
            <SellerSidebar current={"Listings"}/>
            <h2 className="text-2xl mt-2">Welcome back to UnivEats!</h2>
            <h2 className="text-2xl mt-2">Manage your meal listings here. Click the button to get started!</h2>
            <AddMealButton onSubmit={handleAddMeal}/>
        </body>
    )
}

export default Listings