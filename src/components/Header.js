import React, { useEffect, useRef, useState } from "react";
import { useCart } from "../contexts/CartContext";
import { Link } from "react-router-dom";
import { BsBag } from "react-icons/bs";
import logo from '../Assets/Logo.svg'
import { FaUser, FaCog, FaSignOutAlt, FaShoppingCart } from "react-icons/fa";
import { useUser } from "../contexts/ProductContext";

const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const { itemAmount,isOpen,setIsOpen } = useCart();
  const { signinUser, handleLogout, isLoggedin, selectedPhoto } = useUser();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const useOutsideClick = (ref) => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    });
  };

  useOutsideClick(dropdownRef);


  useEffect(() => {
    const handleScroll = () => {
      setIsActive(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`${isActive ? "bg-white py-4 shadow-md" : "bg-none py-6"
        } fixed w-full z-10 lg:px-8 transition-all`}
    >
      <div className="container mx-auto flex items-center justify-between h-full">
        <Link to={"/"}>
          <div className="w-[40px]">
            <img src={logo} alt="logo" />
          </div>
        </Link>

        <div
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer flex relative"
        >
          <BsBag className="text-2xl" />
          <div className="bg-red-500 absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center">
            {itemAmount}
          </div>
        </div>
        <div>
          <div className="relative inline-block text-left" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="flex items-center hover:text-gray-300"
            >
              <img
                src={selectedPhoto || "https://img.freepik.com/premium-vector/man-character_665280-46967.jpg"} // Replace with your image URL
                alt="Profile"
                className="w-8 h-8 rounded-full mr-2 object-cover"
              />
              <span className="hidden md:inline">{signinUser}</span>
            </button>

            {isProfileOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  {isLoggedin ? (
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FaSignOutAlt className="inline-block mr-2" /> Sign Out
                    </button>
                  ) : (
                    <Link to='/login'
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FaUser className="inline-block mr-2" /> Login
                    </Link>
                  )}
                  <Link to="/settings" className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <FaCog className="inline-block mr-2" /> Settings
                  </Link>
                  <Link to="/orders" className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <FaShoppingCart className="inline-block mr-2" /> orders
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
