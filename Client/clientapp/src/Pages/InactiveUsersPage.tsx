import { useAtom } from "jotai";
import { PlayerAtom } from "../Atoms/PlayerAtom";
import { useEffect } from "react";
import { http } from '../http';
import { useNavigate} from 'react-router-dom';
import addAuthHeaders from "../AuthHeader";

function InactiveUsersPage() {

    const navigate = useNavigate();
    const [inactivePlayers, setInactivePlayers] = useAtom(PlayerAtom);
    
    
    useEffect(() => {
        http.api.playerProfileGetAllInactivePlayersList({
            headers: addAuthHeaders(),
        })
            .then((response) => {
                setInactivePlayers(response.data);
            })
            .catch((e) => {
                console.error("Failed to fetch inactive players", e);
            });
    }, []);

    const viewTransactionHistory = (playerId: string) => {
        navigate(`/players/${playerId}/transactions`);
    };

   const makeActive = (id: string) => {
        http.api.playerProfileMakeActivePartialUpdate(id,{
            headers: addAuthHeaders(),
        });
       setInactivePlayers((prev) => prev.filter((player) => player.playerId !== id));

        
    };

    return (
        <div className="w-full mx-auto space-y-12 text-gray-800">
            {/* Header Section */}
            <header className="text-center bg-red-600 text-white py-16">
                <h1 className="text-4xl font-extrabold">Inactive Players</h1>
                <p className="text-lg mt-2">
                    Manage inactive players. Reactivate accounts as needed.
                </p>
            </header>

            {/* Inactive Players Section */}
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-semibold text-center mb-12">Inactive Player Profiles</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {inactivePlayers.map((player) => (
                        <div
                            key={player.playerId}
                            className="bg-white border rounded-lg shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
                        >
                            {/* Player Info */}
                            <div>
                                <h3 className="text-xl font-bold text-gray-700">
                                    {player.name} {player.surname}
                                </h3>
                                <p className="text-sm text-gray-500">{player.email}</p>
                                <p className="text-sm text-gray-500">{player.phone}</p>
                                <p className="mt-3 text-sm text-gray-600">
                                    <span className="font-semibold text-gray-800">Balance:</span> ${player.balance}
                                </p>
                            </div>

                            {/* Make Active Button */}
                            <div className="mt-6 space-y-3">
                                <button
                                    onClick={() => makeActive(player.playerId!)}
                                    className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                                >
                                    Make Active
                                </button>
                                <button
                                    onClick={() => viewTransactionHistory(player.playerId!)}
                                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                >
                                    View Transactions
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer Section */}
            <footer className="text-center text-gray-500 bg-gray-100 py-6">
                <p>&copy; 2024 Dead Pigeons. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default InactiveUsersPage;