import { useEffect, useState } from "react";
import { http } from "../http";
import { useParams } from "react-router-dom";
import { DetailGameHystoryDto } from "../myApi";
import toast from 'react-hot-toast';
import addAuthHeaders from "../AuthHeader";


function DetailGameHistoryPage() {
    
    
    const {gameId} = useParams();
    const [history, setHistory] = useState<DetailGameHystoryDto[]>([]);

    useEffect(() => {
        if (!gameId) {
            toast.error("Game ID is missing.");
            return;
        }

        const fetchGameHistory = async () => {
            try {
                const response = await http.api.boardDetail(gameId,{
                    headers: addAuthHeaders(), 
                }); 
                setHistory(response.data);
            } catch (error) {
                toast.error("Failed to fetch game history.");
                console.error(error);
            }
        };

        fetchGameHistory();
    }, [gameId]);

    return (
        <div className="w-full mx-auto space-y-12 text-gray-800">
            {/* Header Section */}
            <header className="text-center bg-red-600 text-white py-16">
                <h1 className="text-4xl font-bold">Game Details</h1>
            </header>

            {/* Game History Section */}
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-semibold text-center mb-12">Game History</h2>

                {history.length > 0 ? (
                    <div className="space-y-6">
                        {history.map((entry, index) => (
                            <div
                                key={index}
                                className="p-6 border rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    <p>
                                        <span className="font-semibold text-gray-700">Price:</span>{" "}
                                        {entry.price ? `DKK ${entry.price.toFixed(2)}` : "N/A"}
                                    </p>
                                    <p>
                                        <span className="font-semibold text-gray-700">Created At:</span>{" "}
                                        {entry.createdAt
                                            ? new Date(entry.createdAt).toLocaleDateString()
                                            : "N/A"}
                                    </p>
                                    <p>
                                        <span className="font-semibold text-gray-700">Sequence:</span>{" "}
                                        {entry.sequence || "N/A"}
                                    </p>
                                    <p>
                                        <span className="font-semibold text-gray-700">User Name:</span>{" "}
                                        {entry.userName}
                                    </p>
                                    <p>
                                        <span className="font-semibold text-gray-700">Email:</span>{" "}
                                        {entry.email}
                                    </p>
                                    <p>
                                        <span className="font-semibold text-gray-700">Full Name:</span>{" "}
                                        {entry.name} {entry.surname}
                                    </p>
                                    <p>
                                        <span className="font-semibold text-gray-700">Phone:</span>{" "}
                                        {entry.phone}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center mt-10">
                        <p className="text-lg text-gray-500">
                            No history data available for this game.
                        </p>
                    </div>
                )}
            </div>

            {/* Footer Section */}
            <footer className="text-center bg-gray-800 text-white py-6">
                <p>&copy; 2024 Dead Pigeons. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default DetailGameHistoryPage;