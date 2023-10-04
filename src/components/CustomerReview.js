import React from 'react';
import { FaStar } from 'react-icons/fa'; // Import star icons from React Icons

const CustomerReview = ({ name, rating, comment }) => {
  // Create an array of stars based on the rating
  const stars = Array.from({ length: rating }, (_, index) => (
    <FaStar key={index} className="text-yellow-500" />
  ));

  // Calculate the number of empty stars (5 - rating)
  const emptyStars = Array.from({ length: 5 - rating }, (_, index) => (
    <FaStar key={index} className="text-gray-300" />
  ));

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center mb-2">
        <div className="flex">
          {stars}
          {emptyStars}
        </div>
        <h3 className="text-lg font-semibold ml-4">{name}</h3>
      </div>
      <p className="text-gray-700">{comment}</p>
    </div>
  );
};

export default CustomerReview;
