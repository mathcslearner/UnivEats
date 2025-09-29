import ToggleButton from "./ToggleButton";
import BuyerSidebar from "./Buyer/BuyerSidebar";
import ProfileCard from "./ProfileCard";
import { useState, useEffect } from "react";

const Profile = () => {
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const id = localStorage.getItem("userId");
        setUserId(id);
    }, [])

    return(
        <body className="min-h-screen flex flex-col items-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
            <BuyerSidebar current={"Profile"}/>
            <h1 className="text-gray-900 text-4xl font-bold mt-5 text-center">Profile Page</h1>
            <nav className="fixed top-5 right-5 ">
                <ToggleButton />
            </nav>
            <h2 className="text-2xl mt-2 mb-5">Welcome back to UnivEats!</h2>
            <ProfileCard userId={userId}/>
        </body>
    )
};

export default Profile
