import React, {useState} from "react";
import toast from "react-hot-toast";
import { http } from "../http";
import { useNavigate } from 'react-router-dom';
import addAuthHeaders from "../AuthHeader";

export default function RegisterUserPage(){

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        name:'',
        surname:'',
        phone:'',
        firstpass: true
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value, type, checked} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            
            await http.api.authRegisterCreate({
                username: formData.username,
                name:formData.name,
                surname:formData.surname,
                phone:formData.phone,
                email: formData.email,
                password: formData.password,
                firstPass: formData.firstpass
                
            },{headers: addAuthHeaders()});
            navigate("/Users")
            toast.success('Registration successful!');
           

        } catch (err) {
            toast.error('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto mt-10 bg-gray-100 shadow-lg rounded-lg overflow-hidden">
            <div className="bg-gradient-to-r from-red-500 to-red-700 text-white py-6 text-center">
                <h2 className="text-3xl font-bold">Register a User</h2>
            </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Creativelayer088"
                            className="appearance-none border border-gray-300 rounded-lg w-full py-2 px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-500 transition"
                            required
                        />
                    </div>
                    
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-2">First Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="John"
                                className="appearance-none border border-gray-300 rounded-lg w-full py-2 px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-500 transition"
                                required
                            />
                        </div>
                    
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-2">Last Name</label>
                            <input
                                type="text"
                                name="surname"
                                value={formData.surname}
                                onChange={handleChange}
                                placeholder="Pork"
                                className="appearance-none border border-gray-300 rounded-lg w-full py-2 px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-500 transition"
                                required
                            />
                        </div>
                    
                    
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="example@gmail.com"
                                className="appearance-none border border-gray-300 rounded-lg w-full py-2 px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-500 transition"
                                required
                            />
                        </div>
                    
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-2">Phone number</label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+456666666"
                                className="appearance-none border border-gray-300 rounded-lg w-full py-2 px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-500 transition"
                                required
                            />
                        </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="********"
                            className="appearance-none border border-gray-300 rounded-lg w-full py-2 px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-500 transition"
                            required
                        />
                    </div>

                    <div className="flex justify-center mt-6">
                        <button
                            type="submit"
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg shadow-md transition focus:outline-none focus:ring-2 focus:ring-red-400"
                        >
                            Register user
                        </button>
                    </div>
                </form>
            </div>
);
}