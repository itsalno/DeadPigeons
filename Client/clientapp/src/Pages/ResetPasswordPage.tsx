import React, {useEffect, useState} from "react";
import { http } from '../http';
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
function ResetPasswordPage() {

    const [formData, setFormData] = useState({
        newPassword: "",
        repeatPassword: "",
    });
    const [error, setError] = useState("");
    const [userId, setUserId] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const storedUserId = localStorage.getItem("userId");

        if (storedUserId) {
            setUserId(storedUserId);
        } else {
            toast.error("Please log in.");
            return;
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(""); // Clear error on input change
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Check if passwords match
        if (formData.newPassword !== formData.repeatPassword) {
            setError("Passwords do not match. Please try again.");
            return;
        }

        http.api.authResetPassPartialUpdate(userId, { newPass: formData.repeatPassword });
        toast.success("Succsefuly reseted a password");
        navigate("/LogIn");
        
        // Clear the form
        setFormData({ newPassword: "", repeatPassword: "" });
        setError("");
    };

    return (
        <div className="w-full max-w-md mx-auto mt-10 bg-gray-100 shadow-lg rounded-lg overflow-hidden">
            <div className="bg-gradient-to-r from-red-500 to-red-700 text-white py-6 text-center">
                <h2 className="text-3xl font-bold">Reset Your Password</h2>
            </div>

            <div className="px-6 py-8">
                <p className="text-gray-700 mb-6">
                    This is your first login. The admin has assigned you a temporary password. Please reset your password to something of your own choice for security reasons.
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">New Password</label>
                        <input
                            type="password"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            placeholder="Enter your new password"
                            className="appearance-none border border-gray-300 rounded-lg w-full py-2 px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-500 transition"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Repeat New Password</label>
                        <input
                            type="password"
                            name="repeatPassword"
                            value={formData.repeatPassword}
                            onChange={handleChange}
                            placeholder="Re-enter your new password"
                            className="appearance-none border border-gray-300 rounded-lg w-full py-2 px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-500 transition"
                            required
                        />
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm mb-4">{error}</p>
                    )}

                    <div className="flex justify-center mt-6">
                        <button
                            type="submit"
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg shadow-md transition focus:outline-none focus:ring-2 focus:ring-red-400"
                        >
                            Reset Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default ResetPasswordPage;