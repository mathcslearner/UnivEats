import {type ReactNode} from 'react';
import {Apple, BookA, CircleDollarSign, MessageCircleMore, UserRoundPen} from 'lucide-react';
import ToggleButton from '../ToggleButton';
import SellerSidebar from './SellerSidebar';
import Feature from '../Feature';

type featureItem = {
    icon: ReactNode,
    name: String,
    purpose: String,
    description: Array<String>
}

const features:featureItem[] = [
    {
        icon: <Apple />,
        name: "Listings",
        purpose: "Create, update or manage meals for sale.",
        description: [
            "Add new meals (title, description, price, image, availability)",
            "Manage and edit existing meals",
            "Tag meals with categories",
            "View popularity metrics"
        ]
    },
    {
        icon: <MessageCircleMore />,
        name: "Message",
        purpose: "Connect with fellow students.",
        description: [
            "Chat interface with buyers to answer questions",
            "Notifications for new messages",
            "Receive custom requests"
        ]
    },
    {
        icon: <BookA />,
        name: "Orders",
        purpose: "Track and update buyer orders from start to finish.",
        description: [
            "View all current and past orders",
            "Update status of ongoing orders",
            "Filter by date"
        ]
    },
    {
        icon: <CircleDollarSign />,
        name: "Earnings",
        purpose: "Monitor income, payouts, and sales trend",
        description: [
            "Graph of sales over time",
            "Total earnings + weekly/monthly breakdown"
        ]
    },
    {
        icon: <UserRoundPen />,
        name: "Profile",
        purpose: "Showcase your bio, specialties, and availability",
        description: [
            "Seller bio, profile picture and food specialty",
            "Display user ratings and reviews"
        ]
    }
]

const SellerDashboard = () => {
    return(
        <body className="min-h-screen flex flex-col items-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
            <h1 className="text-gray-900 text-4xl font-bold mt-5">UnivEats Dashboard (Seller Mode)</h1>
            <nav className="fixed top-5 right-5 ">
                <ToggleButton />
            </nav>
            <SellerSidebar current={"Home"}/>
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

export default SellerDashboard