import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const ContactForm = () => {

    const [message, setMessage] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        const URL = process.env.NODE_ENV === 'development' ? `${process.env.REACT_APP_DEV_URL_FOR_BACKEND}/response` : `${process.env.REACT_APP_PRO_URL_FOR_BACKEND}/response`;
        axios.post(URL, message)
            .then(response => {
                setLoading(false);
                toast(response.data.message);
            })
            .catch(err => {
                setLoading(false);
                toast("Email Send Failed")
                console.log(err);
            })
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-bold">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        onChange={(e) => setMessage({ ...message, name: e.target.value })}
                        className="w-full p-2 border rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-bold">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        onChange={(e) => setMessage({ ...message, email: e.target.value })}
                        className="w-full p-2 border rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="message" className="block text-gray-700 font-bold">
                        Message
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        onChange={(e) => setMessage({ ...message, message: e.target.value })}
                        className="w-full p-2 border rounded-md"
                        rows="4"
                        required
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                    Send Message
                </button>
                {loading ? <p className=' text-red-500 mt-1'>Sending...</p> : <ToastContainer />}
            </form>
        </div>
    );
};

export default ContactForm;
