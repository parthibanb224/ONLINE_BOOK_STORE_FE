import React from "react";
import { Link } from "react-router-dom";
import { IoMdAdd, IoMdClose, IoMdRemove } from "react-icons/io";
import { useCart } from "../contexts/CartContext";

const CartItem = ({ item }) => {
  const { removeFromCart, increaseAmount, decreaseAmount } = useCart();

  return (
    <div className="flex gap-4 py-4 lg:px-6 border-b border-gray-300">
      <div className="w-full min-h-[150px] flex items-center gap-4">
        <Link to={`/product/${item._id}`}>
          <img className="max-w-[80px] rounded-md" src={item.thumbnailUrl} alt="" />
        </Link>
        <div className="w-full flex flex-col">
          <div className="flex justify-between mb-2">
            <Link
              to={`/product/${item._id}`}
              className="text-lg uppercase font-semibold text-primary hover:underline max-w-[240px]"
            >
              {item.title}
            </Link>
            <div
              onClick={() => removeFromCart(item._id)}
              className="text-2xl cursor-pointer text-gray-600 hover:text-red-600 transition duration-300"
            >
              <IoMdClose />
            </div>
          </div>
          <div className="flex gap-4 text-lg">
            <div className="flex flex-1 max-w-[100px] items-center h-[36px] border text-primary font-medium rounded-full">
              <div
                onClick={() => decreaseAmount(item._id)}
                className="h-full flex-1 flex justify-center items-center cursor-pointer"
              >
                <IoMdRemove className="text-xl" />
              </div>
              <div className="h-full flex justify-center items-center px-2">
                {item.amount}
              </div>
              <div
                onClick={() => increaseAmount(item._id)}
                className="h-full flex flex-1 justify-center items-center cursor-pointer"
              >
                <IoMdAdd className="text-xl" />
              </div>
            </div>
            <div className="flex flex-1 justify-center items-center text-lg">
              $ {item.pageCount}
            </div>
            <div className="flex flex-1 justify-end items-center text-primary font-medium">
              $ {(item.pageCount * item.amount).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
