const Footer = () => {
    return (
      <footer className="w-full bg-gray-900 text-gray-300 py-6">
        <div className="w-full max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          {/* Left section: identifying info */}
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <p className="font-semibold text-white">My Website</p>
            <p className="text-sm">© 2025 Ming Zhe Li. All rights reserved.</p>
          </div>
  
          {/* Right section: optional links */}
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
            <a href="#" className="hover:text-white transition">Contact</a>
          </div>
        </div>
      </footer>
    );
  };

export default Footer