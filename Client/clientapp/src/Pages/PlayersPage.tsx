import {useAtom} from "jotai";
import {PlayerAtom} from "../Atoms/PlayerAtom"
import {useEffect} from "react";
import { http } from '../http';
import {Link, useNavigate} from 'react-router-dom';
import addAuthHeaders from "../AuthHeader";

function PlayersPage() {

    const navigate = useNavigate();
    const [player, setPlayer] = useAtom(PlayerAtom);

    useEffect(() => {
        http.api.playerProfileGetAllPlayersList({
            headers: addAuthHeaders(),
        }).then((response) => {
                setPlayer(response.data);
        }).catch(e => {
            console.log("Failed to Fetch all papers" + e)
        })
    }, [])

    const viewTransactionHistory = (playerId: string) => {
        navigate(`/players/${playerId}/transactions`);
    };

    const deletePlayer = (id: string) => {
        http.api.playerProfileSoftDeletePartialUpdate(id,{
            headers: addAuthHeaders(),
        });
        window.location.reload();

        navigate("/Users")

    };


    return (
        <div className="w-full mx-auto space-y-12 text-gray-800">
            {/* Header Section */}
            <header className="text-center bg-red-600 text-white py-16">
                <h1 className="text-4xl font-extrabold">Players</h1>
                <p className="text-lg mt-2">
                    Manage all players from this page. View balances, transactions, and manage accounts efficiently.
                </p>
            </header>

            {/* Players Section */}
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-semibold text-center mb-12">Player Profiles</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {/* Button Section */}
                    <div className="flex flex-col space-y-4">
                        <Link to="/RegisterUser" className="btn btn-ghost small-case text-l m-1">
                            Register a New User
                        </Link>
                        <Link to="/InactiveUsers" className="btn btn-ghost small-case text-l m-1">
                            View Inactive Users
                        </Link>
                    </div>

                    {/* Player Cards */}
                    {player.map((player) => (
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

                            {/* Action Buttons */}
                            <div className="mt-6 space-y-3">
                                <button
                                    onClick={() => deletePlayer(player.playerId!)}
                                    className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                                >
                                    Make Inactive
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

export default PlayersPage;