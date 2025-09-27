import React from "react";
import { FaTruck } from "react-icons/fa";
import Navigation from "./Auth/Navigation";
const Home = () => {
  return (
    <div className="bg-[url('https://images.prismic.io/ubac/Zv5Rm7VsGrYSwU4L_sliderethomeoct24-4-.png')] bg-cover bg-center min-h-screen">
      <div className="bg-[#212322] p-1.5">
        <p className="text-xs text-white text-center flex items-center justify-center gap-2">
          <FaTruck size={12} color="#fff" />
          FREE DELIVERY FROM<b>120€</b>AND FREE RETURNS WITHIN<b>60 DAYS</b>
        </p>
      </div>
        <div>
            <Navigation/>
        </div>
    </div>
  );
};

export default Home;
