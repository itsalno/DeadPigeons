import React, { useState } from 'react';
import { http } from '../http';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { isLoggedInAtom } from '../Atoms/AuthAtom';
import { activeGameAtom } from '../Atoms/GameAtom';

const LogInPage: React.FC = () => {
    
    const [game, setActiveGame] = useAtom(activeGameAtom);
    const [isRegister, setIsRegister] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    
    const [loading, setLoading] = useState(false);
    
    
    const handleToggle = () => {
        
        
        setIsRegister(!isRegister);
        setFormData({
            username: '',
            email: '',
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        console.log(`Submitting to ${isRegister ? 'Register' : 'Login'} endpoint`);
        
        try {
            
            if (isRegister) {
                await http.api.authRegisterCreate({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                });
                toast.success('Registration successful!');
                handleToggle();
            } else {
                const response = await http.api.authLoginCreate({
                    username: formData.username,
                    password: formData.password,
                });
                
                /*if (response && response.Token) {
                    const token = response.Token; 
                    
                    localStorage.setItem('authToken', token);
                    
                 */

                setIsLoggedIn(true);
                toast.success('Login successful!');
                
                http.api.gameActiveGameCreate().then((response)=> {setActiveGame(response.data)});
                
                console.log(game.week);
                localStorage.setItem('week', game.week);
                localStorage.setItem('year', game.year);
                
                
                
                
                const { token, playerProfileId } = response.data;
                
                localStorage.setItem("token", token);
                localStorage.setItem("playerProfileId", playerProfileId);

                toast.success('Login successful!');
                setIsLoggedIn(true);
                navigate("/Games");
                
            }
            
        } catch (err) {
            toast.error('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto mt-10 bg-white shadow-md rounded px-8 py-6">
            <h2 className="text-2xl font-bold text-center mb-4">
                {isRegister ? 'Register' : 'Login'}
            </h2>
            
            <div className="text-center mb-6">
                <button
                    className="text-blue-500 underline"
                    onClick={handleToggle}
                >
                    {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
                </button>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Creativelayer088"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                
                {isRegister && (
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="example@gmail.com"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required={isRegister}
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

