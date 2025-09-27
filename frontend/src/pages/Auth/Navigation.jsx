import React from "react";
import { FaHeart } from "react-icons/fa";
import { AiOutlineUserAdd } from "react-icons/ai";
import { MdOutlineShoppingBag } from "react-icons/md";
import {Link} from 'react-router'
const Navigation = () => {
  return (
    <div className="flex justify-between items-center pt-2 my-0 mx-8">
      <div>
        <h1 className="text-[22px] font-bold text-white m-[20px_22px] cursor-pointer">
          U B A C
        </h1>
      </div>
      <ul className="flex justify-center items-center gap-4 text-[13px] mr-20  text-white font-bold">
        <div className="relative group w-full flex justify-center">
          <li className="p-[20px_10px] cursor-pointer">WOMAN</li>

          {/* Centered Dropdown menu */}
          <ul className="absolute top-full left-1/2 -translate-x-1/2 bg-white text-black shadow-lg rounded-lg min-w-[900px] min-h-[400px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 p-6 grid grid-cols-4 gap-6">
            {/* Image Section */}
            <li className="col-span-1">
              <img
                src="https://images.prismic.io/ubac/ZquShh5LeNNTxuRu_22.png?auto=format%2Ccompress&rect=0%2C0%2C360%2C440&w=1200&q=80"
                alt="Women's Shoes"
                className="w-full h-[200px] rounded-md object-cover"
              />
            </li>

            {/* Heels */}
            <li>
              <h3 className="text-lg font-semibold mb-2">Heels</h3>
              <ul className="space-y-1 text-sm">
                <li className="hover:text-pink-600 cursor-pointer">
                  Stilettos
                </li>
                <li className="hover:text-pink-600 cursor-pointer">
                  Block Heels
                </li>
                <li className="hover:text-pink-600 cursor-pointer">
                  Kitten Heels
                </li>
                <li className="hover:text-pink-600 cursor-pointer">Wedges</li>
              </ul>
            </li>

            {/* Flats */}
            <li>
              <h3 className="text-lg font-semibold mb-2">Flats</h3>
              <ul className="space-y-1 text-sm">
                <li className="hover:text-pink-600 cursor-pointer">
                  Ballet Flats
                </li>
                <li className="hover:text-pink-600 cursor-pointer">Loafers</li>
                <li className="hover:text-pink-600 cursor-pointer">Mules</li>
                <li className="hover:text-pink-600 cursor-pointer">Slip-ons</li>
              </ul>
            </li>

            {/* Casual & Sporty */}
            <li>
              <h3 className="text-lg font-semibold mb-2">Casual & Sporty</h3>
              <ul className="space-y-1 text-sm">
                <li className="hover:text-pink-600 cursor-pointer">Sneakers</li>
                <li className="hover:text-pink-600 cursor-pointer">Sandals</li>
                <li className="hover:text-pink-600 cursor-pointer">Boots</li>
                <li className="hover:text-pink-600 cursor-pointer">
                  Espadrilles
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <div className="relative group w-full flex justify-center">
          <li className="p-[20px_10px] cursor-pointer">MAN</li>

          {/* Centered Dropdown menu */}
          <ul className="absolute top-full left-1/2 -translate-x-1/2 bg-white text-black shadow-lg rounded-lg min-w-[900px] min-h-[400px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 p-6 grid grid-cols-4 gap-6">
            {/* Image Section */}
            <li className="col-span-1">
              <img
                src="https://images.prismic.io/ubac/ZqtEXB5LeNNTxtWd_6.jpg?auto=format%2Ccompress&rect=200%2C0%2C3000%2C2000&w=1400&q=80"
                alt="Men's Shoes"
                className="w-full h-[200px] rounded-md object-cover"
              />
            </li>

            {/* Formal Shoes */}
            <li>
              <h3 className="text-lg font-semibold mb-2">Formal</h3>
              <ul className="space-y-1 text-sm">
                <li className="hover:text-blue-600 cursor-pointer">Oxfords</li>
                <li className="hover:text-blue-600 cursor-pointer">
                  Derby Shoes
                </li>
                <li className="hover:text-blue-600 cursor-pointer">
                  Monk Straps
                </li>
                <li className="hover:text-blue-600 cursor-pointer">
                  Dress Boots
                </li>
              </ul>
            </li>

            {/* Casual Shoes */}
            <li>
              <h3 className="text-lg font-semibold mb-2">Casual</h3>
              <ul className="space-y-1 text-sm">
                <li className="hover:text-blue-600 cursor-pointer">Sneakers</li>
                <li className="hover:text-blue-600 cursor-pointer">Loafers</li>
                <li className="hover:text-blue-600 cursor-pointer">Slip-ons</li>
                <li className="hover:text-blue-600 cursor-pointer">
                  Espadrilles
                </li>
              </ul>
            </li>

            {/* Outdoor & Sport */}
            <li>
              <h3 className="text-lg font-semibold mb-2">Outdoor & Sport</h3>
              <ul className="space-y-1 text-sm">
                <li className="hover:text-blue-600 cursor-pointer">
                  Hiking Boots
                </li>
                <li className="hover:text-blue-600 cursor-pointer">
                  Running Shoes
                </li>
                <li className="hover:text-blue-600 cursor-pointer">Trainers</li>
                <li className="hover:text-blue-600 cursor-pointer">Sandals</li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="relative group w-full flex justify-center">
          <li className="p-[20px_10px] cursor-pointer">NEWS</li>

          {/* Mega Dropdown */}
          <ul className="absolute top-full left-1/2 -translate-x-1/2 bg-white text-black shadow-xl rounded-lg min-w-[1000px] min-h-[400px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 p-6 grid grid-cols-2 gap-8">
            {/* MAN Section */}
            <li>
              <h2 className="text-xl font-bold mb-4">MAN</h2>
              <img
                src="https://images.prismic.io/ubac/ZqtKqB5LeNNTxtbm_15.jpg?auto=format%2Ccompress&rect=200%2C0%2C3000%2C2000&w=1400&q=80"
                alt="Men's Fashion"
                className="w-full h-[180px] rounded-md object-cover mb-4"
              />
              <ul className="space-y-2 text-sm">
                <li className="hover:text-blue-600 cursor-pointer">
                  Formal Shoes
                </li>
                <li className="hover:text-blue-600 cursor-pointer">
                  Casual Sneakers
                </li>
                <li className="hover:text-blue-600 cursor-pointer">Loafers</li>
                <li className="hover:text-blue-600 cursor-pointer">Boots</li>
                <li className="hover:text-blue-600 cursor-pointer">Sandals</li>
              </ul>
            </li>

            {/* WOMAN Section */}
            <li>
              <h2 className="text-xl font-bold mb-4">WOMAN</h2>
              <img
                src="https://images.prismic.io/ubac/ZquShh5LeNNTxuRu_22.png?auto=format%2Ccompress&rect=0%2C0%2C360%2C440&w=1200&q=80"
                alt="Women's Fashion"
                className="w-full h-[180px] rounded-md object-cover mb-4"
              />
              <ul className="space-y-2 text-sm">
                <li className="hover:text-pink-600 cursor-pointer">Heels</li>
                <li className="hover:text-pink-600 cursor-pointer">Flats</li>
                <li className="hover:text-pink-600 cursor-pointer">Sneakers</li>
                <li className="hover:text-pink-600 cursor-pointer">Boots</li>
                <li className="hover:text-pink-600 cursor-pointer">Sandals</li>
              </ul>
            </li>
          </ul>
        </div>
        <li className="p-[20px_10px]">VISION</li>
        <li className="p-[20px_10px]">
          <FaHeart size={17} />
        </li>
        <li>
          <Link to='/login'><AiOutlineUserAdd size={17} /></Link>
        </li>
        <li>
          <MdOutlineShoppingBag size={17} />
        </li>
      </ul>
      <div>
        <p className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center text-[12px]">
          EN
        </p>
      </div>
    </div>
  );
};

export default Navigation;
