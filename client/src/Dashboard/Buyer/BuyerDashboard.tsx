import React , {type ReactNode} from 'react';
import './Dashboard.css';
import {BookA, Compass, HeartPlus, Menu, MessageCircleMore, ShoppingCart, User, UserRoundPen} from 'lucide-react';
import ToggleButton from '../ToggleButton';
import BuyerSidebar from './BuyerSidebar';
import Feature from '../Feature';

type featureItem = {
    icon: ReactNode,
    name: String,
    purpose: String,
    description: Array<String>
}

const features: featureItem[]= [
    {
        icon: <Compass />,
        name: "Explore",
        purpose: "Your main marketplace to discover new meals.",
        description: [
            "Browse meals by category (cuisine, dietary restrictions, price)",
            "Search bar for specific meals or cooks",
            "Filters and sorting (price, rating, newest, distance",
            "Meal cards featuring image, title, price, seller, rating"
        ]
    },
    {
        icon: <MessageCircleMore />,
        name: "Message",
        purpose: "Connect with fellow students.",
        description: [
            "Chat interface to ask questions about meals",
            "Notifications for new messages",
            "Request custom meals"
        ]
    },
    {
        icon: <ShoppingCart />,
        name: "Cart",
        purpose: "Review and complete orders.",
        description: [
            "List of selected meals with quantity and total price",
            "Delivery/pickup selection",
            "Adjust quantity or remove items"
        ]
    },
    {
        icon: <HeartPlus />,
        name: "Favorites",
        purpose: "Save your favorite meals or cooks for easy access later.",
        description: [
            "List of saved meals/cooks with images and info",
            "Add to cart directly from favorites",
            "Sorting and filtering"
        ]
    },
    {
        icon: <BookA />,
        name: "Orders",
        purpose: "Manage your meal orders.",
        description: [
            "List of past orders with details",
            "Manage your ongoing orders",
            "Leave reviews and ratings for sellers"
        ]
    },
    {
        icon: <UserRoundPen />,
        name: "Profile",
        purpose: "Update your profile information.",
        description: [
            "Manage delivery/pickup preferences"
        ]
    }
];

const BuyerDashboard = () => {
    return(
        <body className="min-h-screen flex flex-col items-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
            <h1 className="text-gray-900 text-4xl font-bold mt-5 text-center">UnivEats Dashboard (Buyer Mode)</h1>
            <nav className="fixed top-5 right-5 ">
                <ToggleButton />
            </nav>
            <BuyerSidebar current={"Home"}/>
            <h2 className="text-2xl mt-2">Welcome back to UnivEats!</h2>
            <h2 className="text-2xl mt-2">Explore the different features of UnivEats through the side menu on the left side. Here's a sneak peek:</h2>
            <div id="features-container" className="grid grid-cols-2 gap-2 my-6">
                {features.map((feature) => (<Feature icon={feature.icon} name={feature.name} purpose={feature.purpose} description={feature.description} />))}
            </div>
            <p className="text-center text-xl my-5">
                Enjoy your food adventure with us!
            </p>
        </body>
    )
}

export default BuyerDashboard