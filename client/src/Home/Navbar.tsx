const Navbar = () => {
    return (
      <nav className="w-full fixed top-0 left-0 z-50 flex items-center justify-end p-4 bg-transparent">
        <div className="flex gap-4">
          <button className="px-5 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
            Sign Up
          </button>
          <button className="px-5 py-2 rounded-full bg-gray-800 text-white font-semibold hover:bg-gray-900 transition">
            Dashboard
          </button>
        </div>
      </nav>
    );
  };
  
export default Navbar