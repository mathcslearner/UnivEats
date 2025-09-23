import React from 'react';
import './Dashboard.css';
import ToggleButton from './ToggleButton';
import BuyerSidebar from './BuyerSidebar';

const BuyerDashboard = () => {
    return(
        <body className="min-h-screen flex flex-col items-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
            <h1 className="text-gray-900 text-4xl font-bold mt-5">UniEats Dashboard (Buyer Mode)</h1>
            <nav className="fixed top-5 right-5 ">
                <ToggleButton />
            </nav>
            <BuyerSidebar />
        </body>
    )
}

export default BuyerDashboard