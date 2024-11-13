import React, { useState } from 'react';

const LogInPage: React.FC = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phone: '',
        password: '',
    });
    
    const handleToggle = () => {
        setIsRegister(!isRegister);
        setFormData({
            username: '',
            email: '',
            phone: '',
            password: '',
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        //no logic right now,but when we do authorization and uthentication will modify this one
    };

    return (
        <div className="w-full max-w-md mx-auto mt-10 bg-white shadow-md rounded px-8 py-6">
            <h2 className="text-2xl font-bold text-center mb-4">
                {isRegister ? 'Register' : 'Login'}
            </h2>

            {/* Toggle Login/Register */}
            <div className="text-center mb-6">
                <button
                    className="text-blue-500 underline"
                    onClick={handleToggle}
                >
                    {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
                </button>
            </div>

            <form onSubmit={handleSubmit}>
                {isRegister && (
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Creativelayer088"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required={isRegister}
                        />
                    </div>
                )}

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="example@gmail.com"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

                {isRegister && (
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+371"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                )}

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="********"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-700 transition"
                    >
                        {isRegister ? 'Register' : 'Login'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LogInPage;

