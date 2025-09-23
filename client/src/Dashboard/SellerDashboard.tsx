import React from 'react';
import ToggleButton from './ToggleButton';
import SellerSidebar from './SellerSidebar'

const SellerDashboard = () => {
    return(
        <body className="min-h-screen flex flex-col items-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
            <h1 className="text-gray-900 text-4xl font-bold mt-5">UniEats Dashboard (Seller Mode)</h1>
            <nav className="fixed top-5 right-5 ">
                <ToggleButton />
            </nav>
            <SellerSidebar />
        </body>
    )
}

export default SellerDashboard