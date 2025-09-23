import {useState, type ReactNode} from 'react';
import {Home, BookA, Compass, HeartPlus, Menu, MessageCircleMore, ShoppingCart, UserRoundPen, User} from 'lucide-react';
import {Link} from 'react-router';

type MenuItem = {
    name: string;
    path: string;
    icon: ReactNode;
}

const menuItems : MenuItem[] = [
    {name: "Home", path: "/buyer-dashboard", icon: <Home size = {20}/>},
    {name: "Explore", path: "/buyer-dashboard/explore", icon: <Compass size={20}/>},
    {name: "Message", path: "/message", icon: <MessageCircleMore size={20} />},
    {name: "Cart", path: "/buyer-dashboard/cart", icon: <ShoppingCart size={20} />},
    {name: "Favorites", path: "/buyer-dashboard/favorites", icon: <HeartPlus size={20} />},
    {name: "Orders", path: "/buyer-dashboard/orders", icon: <BookA size={20} />},
    {name: "Profile", path: "/profile", icon: <UserRoundPen size={20} />}
]

const BuyerSidebar = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return(
        <div className="flex fixed left-0">
            <div className = {`${isOpen? "w-64" : "w-16"} h-screen bg-gray-900 text-white p-4 transition-all duration-300`}>
                <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white mb-6">
                    <Menu size={24} />
                </button>
                <nav id="items-container">
                    {menuItems.map((item) => (
                        (<Link to={item.path} key={item.name} className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-700 transition-colors">
                            {item.icon}
                            {isOpen && <span>{item.name}</span>}
                        </Link>)
                    ))}
                </nav>
            </div>
        </div>
    )
}

export default BuyerSidebar