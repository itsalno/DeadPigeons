import React, {useEffect, useState } from 'react';
import { http } from '../http';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { isLoggedInAtom } from '../Atoms/AuthAtom';
import { activeGameAtom } from '../Atoms/GameAtom';

const LogInPage: React.FC = () => {
    
    const [, setIsLoggedIn] = useAtom(isLoggedInAtom);
    const [, setGame] = useAtom(activeGameAtom);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        name:'',
        surname:'',
        phone:'',
       
    });

    const [, setLoading] = useState(false);

    useEffect(() => {
        const now = new Date();
        
        const year = now.getFullYear();

        const week = getISOWeek(now);

        localStorage.setItem("week",week.toString())
        localStorage.setItem("year",year.toString())
    }, []);


    function getISOWeek(date) {
        const tempDate = new Date(date.getTime());
        tempDate.setHours(0, 0, 0, 0); 
        tempDate.setDate(tempDate.getDate() + 3 - ((tempDate.getDay() + 6) % 7)); 
        const firstThursday = new Date(tempDate.getFullYear(), 0, 4); 
        // @ts-ignore
        const diff = tempDate - firstThursday; 
        return 1 + Math.round(diff / (7 * 24 * 60 * 60 * 1000)); 
    }

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
                
                const {token, playerProfileId, firstPass, userId} = response.data;

           

                localStorage.setItem("token", token);
                localStorage.setItem("playerProfileId", playerProfileId);
                
                

                
                localStorage.setItem("userId", userId);
                setIsLoggedIn(true);

              if (firstPass) {
                navigate("/ResetPass")
               }else {
                navigate("/");
                toast.success('Login successful!');
                 }

               
              
              http.api.gameActiveGameCreate().then((response) => {
                  setGame(response.data)
              });
                
               
              
                
                
               

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

