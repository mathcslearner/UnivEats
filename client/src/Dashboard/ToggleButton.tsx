import {useLocation, useNavigate} from 'react-router';

const ToggleButton = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleToggle = () => {
        if (location.pathname.includes("/buyer-dashboard")){
            navigate("/seller-dashboard")
        } else{
            navigate("/buyer-dashboard")
        }
    }

    return(
        <button onClick={handleToggle} className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition">
            {location.pathname.includes("/buyer-dashboard") ? "Switch to Seller Mode" : "Switch to Buyer Mode"}
        </button>
    )
}

export default ToggleButton