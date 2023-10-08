import React from "react";
import { Link } from "react-router-dom";
import { IoMdArrowForward } from "react-icons/io";
import { FiTrash2 } from "react-icons/fi";
import CartItem from "../components/CartItem";
import { useCart } from "../contexts/CartContext";
import { useUser } from "../contexts/ProductContext";

const Sidebar = () => {
  const { cart, clearCart, itemAmount, total, handleClose, isOpen } = useCart();
  const { signinUser } = useUser();

  const handleCheckout = (e) => {
    e.preventDefault();
    if (signinUser === "") {
      alert("please Login!!!!");
    } else {
      var options = {
        key: `${process.env.REACT_APP_RAZORPAY_KEY}`,
        key_secret: `${process.env.oLofjhdZz3S7uY9h2Z12Q18K}`,
        amount: total * 100,
        currency: "INR",
        name: "STARTUP_PROJECTS",
        description: "for testing purpose",
        handler: function (response) {
          alert(response.razorpay_payment_id);
        },
        notes: {
          address: "Razorpay Corporate office"
        },
        theme: {
          color: "#3399cc"
        }
      };
      var pay = new window.Razorpay(options);
      pay.open();
    }
  }

  return (
    <div
      className={`${isOpen ? "right-0" : "-right-full"
        } w-full bg-white fixed top-0 h-full rounded-tl-3xl rounded-bl-3xl shadow-2xl md:w-[35vw] lg:w-[40vw] xl:max-w-[30vw] transition-all duration-300 z-20 px-4 lg:px-[35px]`}
    >
      <div className="flex items-center justify-between py-6 border-b border-gray-300">
        <div className="uppercase text-lg font-semibold text-gray-700">
          Shopping Bag ({itemAmount})
        </div>
        <div
          onClick={handleClose}
          className="cursor-pointer w-8 h-8 flex justify-center items-center text-gray-600 hover:text-primary"
        >
          <IoMdArrowForward className="text-xl" />
        </div>
      </div>
      <div className="flex flex-col gap-4 h-[360px] md:h-[480px] lg:h-[420px] overflow-y-auto overflow-x-hidden">
        {cart.map((item) => {
          return <CartItem item={item} key={item.id} />;
        })}
      </div>
      <div className="flex flex-col gap-3 mt-4">
        <div className="flex w-full justify-between items-center border-t border-gray-300 pt-4">
          {/* Total */}
          <div className="font-semibold text-lg text-gray-700">
            <span className="mr-2">Subtotal:</span> $ {total.toFixed(2)}
          </div>
          {/* Clear cart icon */}
          <div
            onClick={clearCart}
            className="cursor-pointer py-2 px-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-300"
          >
            <FiTrash2 className="text-lg" />
          </div>
        </div>
        <Link
          to={"/"}
          className="bg-gray-200 flex py-3 justify-center items-center text-primary font-medium hover:bg-gray-300 rounded-full transition duration-300"
        >
          View Cart
        </Link>
        <button
          onClick={handleCheckout}
          className="bg-primary flex py-3 justify-center items-center text-white font-medium hover:bg-primary-dark rounded-full transition duration-300"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
