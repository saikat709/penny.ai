import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Penny from "../assets/Penny.svg";

type HeaderProps = {
  title: string;
  menuItems?: string[];
};

const Header: React.FC<HeaderProps> = ({
  title,
  menuItems = ['Home', 'About', 'Contact'],
}) => {
  
  const location = useLocation();
  const [ isOpen, setIsOpen ] = React.useState(false);
  const [ isSidebarOpen, setIsSidebarOpen ] = React.useState(false);
  const { isLoggedIn, logout, isLoading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1)); // Remove '#'
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  // Progress bar state
  const [scrollProgress, setScrollProgress] = React.useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  
  return (
    <>
    {/* Gradient Progress Bar */}
    <div
      style={{
        width: `${scrollProgress}%`,
        height: '5px',
        background: 'linear-gradient(90deg, #a78bfa 0%, #ec4899 50%, #ef4444 100%)',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 100,
        transition: 'width 0.2s ease',
        borderRadius: '0 8px 8px 0',
        boxShadow: '0 2px 8px 0 rgba(236,72,153,0.2)',
      }}
      aria-hidden="true"
    />
    <header
        className="mt-0 w-[100%] px-6 py-3 
            bg-white/10 backdrop-blur-md shadow-md border border-white/20 
            flex items-center justify-between 
            transition-shadow duration-300 
            hover:shadow-[0_0_5px_4px_rgba(255,99,255,0.3)]"
        >
      <h1
        className="text-md md:text-2xl font-semibold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent transition duration-300 hover:drop-shadow-[0_0_6px_rgba(255,99,255,0.8)] transition-transform hover:scale-110 flex gap-1 sm:gap-2 items-center"
      >
        <img src={Penny} alt='car' width={24} height={24} className='sm:w-[34px] sm:h-[34px] hover:scale-140 transition transition-transform duration-300'/>
        <Link to={'/'}>{title}</Link>
      </h1>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-4">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            className="text-white text-md px-3 py-3 rounded-full transition transition-all duration-300 hover:scale-110 hover:bg-white hover:text-black"
            to={`/${item.toLowerCase()}`}
          >
            {item}
          </Link>
        ))}
        
        <button
          className="bg-blue-300 px-5 text-black font-bold text-md px-3 py-2 rounded-full transition transition-all duration-300 hover:scale-110 hover:bg-white hover:text-black"
          onClick={() => {
            if (isLoading) return;
            if ( isLoggedIn ) logout?.();
            else setIsOpen(!isOpen)
          }}
        >
         { isLoggedIn ? "Logout" : "Login" }
        </button>
      </nav>

      {/* Mobile Hamburger Menu */}
      <button
        className="md:hidden text-white focus:outline-none"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </header>

    {/* Mobile Sidebar Overlay */}
    {isSidebarOpen && (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
        onClick={() => setIsSidebarOpen(false)}
      />
    )}

    {/* Mobile Sidebar */}
    <div
      className={`fixed top-0 right-0 h-full w-64 bg-gradient-to-b from-purple-900/95 via-pink-900/95 to-red-900/95 backdrop-blur-md shadow-lg z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
        isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/20">
        <h2 className="text-white text-lg font-semibold">Menu</h2>
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="text-white focus:outline-none"
          aria-label="Close menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Sidebar Navigation */}
      <nav className="flex flex-col p-4 space-y-2">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={`/${item.toLowerCase()}`}
            className="text-white text-lg py-3 px-4 rounded-lg transition transition-all duration-300 hover:bg-white/20 hover:text-white border-b border-white/10 last:border-b-0"
            onClick={() => setIsSidebarOpen(false)}
          >
            {item}
          </Link>
        ))}
        
        <button
          className="bg-blue-300 text-black font-bold text-lg rounded-lg transition transition-all duration-300 hover:bg-white hover:text-black"
          onClick={() => {
            
            if (isLoading) return;

            if ( isLoggedIn ) logout?.();
            else navigate("/auth/login");

            setIsSidebarOpen(false);
          }}
        >
         { isLoggedIn ? "Logout" : "Login" }
        </button>
      </nav>
    </div>
    </>
  );
};

export default Header;
  