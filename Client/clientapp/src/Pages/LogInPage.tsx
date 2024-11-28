import React, { useState } from 'react';
import { http } from '../http';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { isLoggedInAtom } from '../Atoms/AuthAtom';
import { activeGameAtom } from '../Atoms/GameAtom';

const LogInPage: React.FC = () => {
    
    const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
    const [game, setGame] = useAtom(activeGameAtom);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        name:'',
        surname:'',
        phone:''
    });

    const [loading, setLoading] = useState(false);

    

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
            
                const response = await http.api.authLoginCreate({
                    username: formData.username,
                    password: formData.password,
                });


                const {token, playerProfileId} = response.data;

                localStorage.setItem("token", token);
                localStorage.setItem("playerProfileId", playerProfileId);


                localStorage.setItem('isLoggedIn', 'true');
                setIsLoggedIn(true);

               

                http.api.gameActiveGameCreate().then((response) => {
                    setGame(response.data)
                });
                
                localStorage.setItem('week', game.week);
                localStorage.setItem('year', game.year);

            navigate("/");
            toast.success('Login successful!');

        } catch (err) {
            toast.error('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto mt-10 bg-gray-100 shadow-lg rounded-lg overflow-hidden">
            <div className="bg-gradient-to-r from-red-500 to-red-700 text-white py-6 text-center">
                <h2 className="text-3xl font-bold">LogIn</h2>
            </div>
                <div>
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
                           Login
                        </button>
                    </div>
                </form>

                </div>
        </div>
    );
}

export default LogInPage;

