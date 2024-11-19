import {useAtom} from "jotai";
import {PlayerAtom} from "../Atoms/PlayerAtom"
import {useEffect} from "react";
import { http } from '../http';
import { useNavigate } from 'react-router-dom';

function PlayersPage(){
   
    const navigate = useNavigate();
    const [player , setPlayer] = useAtom(PlayerAtom);

    useEffect(() => {
        http.api.playerProfileGetAllPlayersList().then((response) => {
            setPlayer(response.data);
        }).catch(e => {
            console.log("Failed to Fetch all papers" + e)
        })
    }, [])

    

    // Delete player function
    const deletePlayer = (id : string) => {
        http.api.playerProfileSoftDeletePartialUpdate(id);
        
        navigate("/Users")
        
    };

    
    return (
        <div className="w-full mx-auto space-y-12 text-gray-800">
            {/* Header Section */}
            <header className="text-center bg-gray-100 text-gray-800 py-16">
                <h1 className="text-3xl font-bold">Players</h1>
                <p className="text-lg mt-2">Manage all players from this page.</p>
            </header>

            {/* Players Section */}
            <section id="players-list" className="bg-gray-50 py-12 px-8">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-2xl font-semibold text-center mb-8">Player Profiles</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {player.map((player) => (
                            <div
                                key={player.playerId}
                                className="bg-white border border-gray-300 rounded-lg shadow-lg p-4 flex flex-col justify-between"
                            >
                                <div>
                                    <h3 className="text-lg font-bold">{player.userName}</h3>
                                    <p className="text-sm text-gray-600">{player.email}</p>
                                    <p className="mt-2 text-sm">
                                        <span className="font-semibold">Balance:</span> ${player.balance}
                                    </p>
                                </div>
                                <button
                                    onClick={() => deletePlayer(player.playerId!)}
                                    className="mt-4 bg-red-500 text-white py-2 rounded hover:bg-red-600 focus:outline-none"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer Section */}
            <footer className="text-center text-gray-500 bg-gray-100 py-6">
                <p>&copy; 2024 Dead Pigeons. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default PlayersPage;