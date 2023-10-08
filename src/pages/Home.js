import React from "react";
import { useUser } from "../contexts/ProductContext";
import { Link } from "react-router-dom";
import { BsPlus, BsEyeFill } from "react-icons/bs";
import { useCart } from "../contexts/CartContext";

const Products = ({ product }) => {
  const { addToCart } = useCart();
  return (
    <div className="border rounded-lg overflow-hidden shadow-md transition transform hover:scale-105">
      <div className="relative pb-[75%] group">
        <img
          className="absolute w-full h-full object-contain group-hover:opacity-80 transition duration-300"
          src={product.thumbnailUrl}
          alt={product.title}
        />
        <div className="absolute top-0 right-0 p-2 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={() => addToCart(product, product._id)}
            className="bg-teal-500 text-white rounded-full p-2 transform scale-90 hover:scale-100 transition-transform"
          >
            <BsPlus className="text-xl" />
          </button>
          <Link
            to={`/product/${product._id}`}
            className="bg-white text-primary rounded-full p-2 shadow-md transform scale-90 hover:scale-100 transition-transform"
          >
            <BsEyeFill className="text-xl" />
          </Link>
        </div>
      </div>
      <div className="p-4">
        <div className="text-sm text-gray-500 mb-2">{product.authors}</div>
        <Link to={`/product/${product._id}`}>
          <h2 className="font-semibold text-lg mb-2 hover:underline">
            {product.title}
          </h2>
        </Link>
        <h2 className="font-semibold text-xl text-primary">${product.pageCount}</h2>
      </div>
    </div>
  );
};


export default function Home() {
  const { products } = useUser();

  return (
    <div>
      <section className="h-[720px] bg-hero bg-no-repeat bg-cover bg-center py-20">
        <div className="container mx-auto flex justify-center items-center h-full">
          <div className="text-center text-white">
            <div className="font-semibold text-cyan-700 mb-2">
              Hot Topics
            </div>
            <h1 className="uppercase text-4xl md:text-5xl leading-10 font-semibold mb-4">
              Adventure Awaits on<br />
              <span className="font-light">Every Page</span>
            </h1>
            <Link
              to={'/'}
              className='uppercase font-semibold border-b-2 no-underline border-primary hover:text-primary hover:border-primary transition duration-300'
            >
              Discover More
              <span className="font-bold text-2xl ml-1">&#8595;</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-100">
        <div className="container mx-auto">
          <h1 className="text-3xl font-semibold mb-10 text-center">Explore Our Products</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {products?.map((product, index) => (
              <Products product={product} key={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};