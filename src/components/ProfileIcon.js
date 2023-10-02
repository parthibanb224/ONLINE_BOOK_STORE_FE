import React, { useState, useEffect, useRef } from "react";
import { FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useUser } from "../contexts/ProductContext";

function ProfileButton() {
  const {signinUser, handleLogout,isLoggedin,selectedPhoto} = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Custom hook for handling clicks outside of the dropdown
  const useOutsideClick = (ref) => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
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

  return (
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

      {isOpen && (
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
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileButton;
