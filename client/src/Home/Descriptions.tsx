const Descriptions = () => {
    return(
        <div id="descriptions-container" className="flex flex-row items-center justify-center gap-10 mt-5 mb-5">
        <div id="buyer-description" className="p-4 bg-white rounded-2xl shadow-lg text-center transition-transform transform hover:scale-105 duration-300">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">For Buyers</h1>
            <ul className="flex flex-col gap-2">
                <li className="flex items-start gap-2">
                    <span className="text-green-700 mr-2">&#10003;</span>
                    Browse a variety of homemade meals cooked by fellow students.
                </li>
                <li className="flex items-start gap-2">
                    <span className="text-green-700 mr-2">&#10003;</span>
                    Order meals directly from student cooks on or near campus.
                </li>
                <li className="flex items-start gap-2">
                    <span className="text-green-700 mr-2">&#10003;</span>
                    Discover new dishes and flavors you won't find in dining halls.
                </li>
                <li className="flex items-start gap-2">
                    <span className="text-green-700 mr-2">&#10003;</span>
                    Rate and review meals to help others find the best bites.
                </li>
                <li className="flex items-start gap-2">
                    <span className="text-green-700 mr-2">&#10003;</span>
                    Track your orders and arrange convenient pickup times.
                </li>
                <li className="flex items-start gap-2">
                    <span className="text-green-700 mr-2">&#10003;</span>
                    Connect with student cooks for custom meal requests.
                </li>
            </ul>
        </div>
        <div id="seller-description" className="p-4 bg-white rounded-2xl shadow-lg text-center transition-transform transform hover:scale-105 duration-300">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">For Sellers</h1>
            <ul className="flex flex-col gap-2">
                <li className="flex items-start gap-2">
                    <span className="text-green-700 mr-2">&#10003;</span>
                    List homemade dishes with pictures, descriptions, and prices.
                </li>
                <li className="flex items-start gap-2">
                    <span className="text-green-700 mr-2">&#10003;</span>
                    Reach a local audience of fellow students hungry for home-cooked meals.
                </li>
                <li className="flex items-start gap-2">
                    <span className="text-green-700 mr-2">&#10003;</span>
                    Earn money by sharing your culinary skills on campus.
                </li>
                <li className="flex items-start gap-2">
                    <span className="text-green-700 mr-2">&#10003;</span>
                    Manage orders and schedule pickups efficiently.
                </li>
                <li className="flex items-start gap-2">
                    <span className="text-green-700 mr-2">&#10003;</span>
                    Build a reputation through ratings and reviews from buyers.
                </li>
                <li className="flex items-start gap-2">
                    <span className="text-green-700 mr-2">&#10003;</span>
                    Experiment with new recipes and get direct feedback from peers.
                </li>
            </ul>
        </div>
    </div>
    )
}

export default Descriptions