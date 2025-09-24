import {useState, type ReactNode} from 'react';
import {Apple, Home, BookA, CircleDollarSign, Menu, MessageCircleMore, UserRoundPen} from 'lucide-react';
import {NavLink} from 'react-router';

type MenuItem = {
    name: string;
    path: string;
    icon: ReactNode;
}

const menuItems : MenuItem[] = [
    {name: "Home", path: "/seller-dashboard", icon: <Home size = {20}/>},
    {name: "Listings", path: "/seller-dashboard/listings", icon: <Apple size={20}/>},
    {name: "Message", path: "/seller-dashboard/message", icon: <MessageCircleMore size={20} />},
    {name: "Orders", path: "/seller-dashboard/orders", icon: <BookA size={20} />},
    {name: "Earnings", path: "/seller-dashboard/earnings", icon: <CircleDollarSign size={20} />},
    {name: "Profile", path: "/profile", icon: <UserRoundPen size={20} />}
]

type SidebarProps = {
    current: String;
}

const SellerSidebar:React.FC<SidebarProps> = ({current}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return(
        <div className="flex fixed left-0">
            <div className = {`${isOpen? "w-64" : "w-16"} h-screen bg-gray-900 text-white p-4 transition-all duration-300`}>
                <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white mb-6">
                    <Menu size={24} />
                </button>
                <nav id="items-container">
                    {menuItems.map((item) => {
                        return (
                        <div key={item.name} className="relative group">
                            <NavLink to={item.path} className={`${current === item.name ? "bg-gray-700" : null} flex items-center gap-3 p-2 rounded-md hover:bg-gray-700 transition-colors`}>
                            {item.icon}
                            {isOpen && <span>{item.name}</span>}
                            </NavLink>
                            {!isOpen && (
                            <span className="absolute left-14 top-1/2 -translate-y-1/2 px-2 py-1 rounded bg-gray-800 text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
                              {item.name}
                            </span>
                            )}
                        </div>
                        )
                    })}
                </nav>
            </div>
        </div>
    )
}

export default SellerSidebar