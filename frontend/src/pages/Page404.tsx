import React from 'react';
import { Link } from 'react-router-dom'; 
import animation404 from '../assets/lottie/Animation404.json';
import Lottie from 'lottie-react';
import Penny from '../assets/Penny.svg'; 

const Page404: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-br p-0 mb-16 pt-20">
      <Lottie animationData={animation404} loop={true} className="w-56 h-56 mb-0" />
      {/* <h1 className="text-7xl font-extrabold mb-1 text-red-500 hover:scale-120 transition transition-transform duration-500">404</h1> */}
      <p className="text-2xl mb-1 hover:text-white/80 transition duration-500">Oops! Page not found.</p>
      <p className="mb-5 text-gray-400 max-w-md text-center hover:text-gray-100 ransition duration-500">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-purple-600 rounded-full text-white font-semibold hover:bg-green-400 hover:text-black transition flex gap-3 items-center justify-center hover:scale-110 transition transition-transform duration-300"
      >
        <img src={Penny} alt='car' width={26} height={26} className='hover:scale-150 transition transition-transform duration-300'/>
        <p className='hover:scale-130 transition transition-transform duration-300'>Go Home</p>
      </Link>
    </div>
  );
};

export default Page404;
