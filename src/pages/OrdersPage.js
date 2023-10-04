import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import ContactForm from '../components/ContactForm';
import CustomerReview from '../components/CustomerReview';

const orders = [
    // {
    //     id: 1,
    //     date: '2023-10-01',
    //     status: 'Delivered',
    //     total: 125.99,
    //     items: [
    //         { id: 101, title: 'Book Title 1', price: 29.99, quantity: 2 },
    //         { id: 102, title: 'Book Title 2', price: 35.99, quantity: 1 },
    //         // Add more items as needed
    //     ],
    // },
    // Add more orders as needed
];

const OrdersPage = () => {
    return (
        <div className="container mx-auto mt-20">
            <h1 className="text-3xl font-semibold mb-6">Order History</h1>
            {orders.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-80">
                    <div className="text-gray-400 text-center">
                        <FaShoppingCart className="text-6xl" />
                        <p className="text-xl mt-4">
                            Your order history is empty. Start shopping now!
                        </p>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {orders.map((order) => (
                        <div
                            key={order.id}
                            className="bg-white rounded-lg shadow-lg overflow-hidden p-4 text-black"
                        >
                            <div className="bg-white bg-opacity-25 p-2 rounded-full w-8 h-8 flex items-center justify-center">
                                <FaShoppingCart className="text-lg" />
                            </div>
                            <div className="text-xl font-semibold mb-2">{`Order #${order.id}`}</div>
                            <div className="text-gray-300 mb-4">
                                {`Placed on ${new Date(order.date).toLocaleDateString()}`}
                            </div>
                            <div className="grid grid-cols-1 gap-2">
                                {order.items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center bg-white bg-opacity-25 rounded-lg p-2"
                                    >
                                        <img
                                            src={item.imageUrl} // Use the item's image URL
                                            alt={item.title}
                                            className="w-12 h-12 object-cover mr-4 rounded-md"
                                        />
                                        <div className="flex-1">
                                            <div className="text-lg font-semibold text-gray-100">
                                                {item.title}
                                            </div>
                                            <div className="text-gray-300">{`${item.quantity} x $${item.price.toFixed(
                                                2
                                            )}`}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="text-xl font-semibold mt-4">{`Total: $${order.total.toFixed(
                                2
                            )}`}</div>
                            <div className="text-gray-500">{order.status}</div>
                        </div>
                    ))}
                </div>
            )}

            {/* Customer Review Section */}
            <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
                <CustomerReview name="John Doe" rating={4} comment="Great service!" />
                <CustomerReview name="Jane Smith" rating={5} comment="Excellent products!" />
                {/* Add more customer reviews here */}
            </div>

            {/* Contact Form Section */}
            <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                <ContactForm />
            </div>
        </div>
    );
};

export default OrdersPage;
