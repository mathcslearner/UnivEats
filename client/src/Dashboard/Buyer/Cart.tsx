import BuyerSidebar from "./BuyerSidebar"
import ToggleButton from "../ToggleButton"

const Cart = () => {
    return(
        <body className="min-h-screen flex flex-col items-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
            <BuyerSidebar current={"Profile"}/>
            <h1 className="text-gray-900 text-4xl font-bold mt-5 text-center">Cart</h1>
            <nav className="fixed top-5 right-5 ">
                <ToggleButton />
            </nav>
            <h2 className="text-2xl mt-2 mb-5">Finished browsing your next meals? Manage the meals you chose and checkout when you're ready.</h2>
        </body>
    )
}

export default Cart